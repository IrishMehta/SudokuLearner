/*
 * Sudoku board detection
 *
 * This module deliberately only finds the 9 x 9 board.  Reading givens and
 * pencil marks belongs to a later OCR step.  Keeping the geometry here makes
 * it possible to inspect `window.SudokuGridDetector.lastDebug` in DevTools.
 */
(function () {
  "use strict";

  var BOARD_SIZE = 450;
  var MAX_IMAGE_SIDE = 1200;
  var openCvPromise;

  function prepareImage(image) {
    var scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
    var canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext("2d", { willReadFrequently: true }).drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  // Fast, dependency-free pass for screenshots and straight-on photos. It
  // searches for a square whose *interior* has eight evenly-spaced vertical
  // and horizontal grid lines. Text blocks and page borders do not have that
  // structure, which prevents the common "newspaper column" false positive.
  function detectAxisAlignedGrid(canvas) {
    var analysisScale = Math.min(1, 800 / Math.max(canvas.width, canvas.height));
    var width = Math.max(1, Math.round(canvas.width * analysisScale));
    var height = Math.max(1, Math.round(canvas.height * analysisScale));
    var analysis = document.createElement("canvas");
    analysis.width = width;
    analysis.height = height;
    var context = analysis.getContext("2d", { willReadFrequently: true });
    context.drawImage(canvas, 0, 0, width, height);
    var data = context.getImageData(0, 0, width, height).data;
    var vertical = new Float32Array(width * height);
    var horizontal = new Float32Array(width * height);
    var tones = new Uint8Array(width * height);
    var x;
    var y;
    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        var pixel = (y * width + x) * 4;
        tones[y * width + x] = Math.round(data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722);
      }
    }
    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        var at = y * width + x;
        var gx = x > 0 && x < width - 1 ? Math.abs(tones[at + 1] - tones[at - 1]) : 0;
        var gy = y > 0 && y < height - 1 ? Math.abs(tones[at + width] - tones[at - width]) : 0;
        vertical[at] = gx + (y ? vertical[at - width] : 0);
        horizontal[at] = gy + (x ? horizontal[at - 1] : 0);
      }
    }

    function verticalResponse(column, top, bottom) {
      column = Math.round(column);
      var end = Math.round(Math.min(height - 1, Math.max(0, bottom)));
      var start = Math.round(Math.min(end, Math.max(0, top)));
      return (vertical[end * width + column] - (start ? vertical[(start - 1) * width + column] : 0)) / Math.max(1, end - start + 1) / 255;
    }

    function horizontalResponse(row, left, right) {
      row = Math.round(row);
      var end = Math.round(Math.min(width - 1, Math.max(0, right)));
      var start = Math.round(Math.min(end, Math.max(0, left)));
      return (horizontal[row * width + end] - (start ? horizontal[row * width + start - 1] : 0)) / Math.max(1, end - start + 1) / 255;
    }

    function findLine(expected, radius, lower, upper, response) {
      var best = { position: Math.round(expected), value: -1 };
      for (var position = Math.max(lower, Math.floor(expected - radius)); position <= Math.min(upper, Math.ceil(expected + radius)); position += 1) {
        var value = response(position);
        if (value > best.value) best = { position: position, value: value };
      }
      return best;
    }

    function evaluate(left, top, size) {
      left = Math.round(left);
      top = Math.round(top);
      size = Math.round(size);
      var step = size / 9;
      var radius = Math.max(2, step * 0.28);
      var columns = [];
      var rows = [];
      var columnStrength = 0;
      var rowStrength = 0;
      var error = 0;
      for (var line = 0; line <= 9; line += 1) {
        var expectedX = left + line * step;
        var expectedY = top + line * step;
        var column = findLine(expectedX, radius, left, left + size, function (position) { return verticalResponse(position, top, top + size); });
        var row = findLine(expectedY, radius, top, top + size, function (position) { return horizontalResponse(position, left, left + size); });
        columns.push(column.position);
        rows.push(row.position);
        // The outer border is useful but optional; score the eight internal
        // dividers most heavily because they uniquely identify a Sudoku grid.
        if (line > 0 && line < 9) {
          columnStrength += Math.min(1, column.value);
          rowStrength += Math.min(1, row.value);
          error += Math.abs(column.position - expectedX) / step + Math.abs(row.position - expectedY) / step;
        }
      }
      var lineStrength = Math.min(columnStrength, rowStrength) / 8;
      var regularity = Math.max(0, 1 - error / 16);
      var borderStrength = Math.min((verticalResponse(columns[0], top, top + size) + verticalResponse(columns[9], top, top + size)) / 2, (horizontalResponse(rows[0], left, left + size) + horizontalResponse(rows[9], left, left + size)) / 2);
      var score = lineStrength * 0.67 + regularity * 0.25 + Math.min(1, borderStrength) * 0.08;
      return { score: score, lineStrength: lineStrength, regularity: regularity, columns: columns, rows: rows };
    }

    function findBands(projection, minimum) {
      var bands = [];
      for (var index = 0; index < projection.length;) {
        if (projection[index] < minimum) {
          index += 1;
          continue;
        }
        var start = index;
        var weight = 0;
        var centre = 0;
        while (index < projection.length && projection[index] >= minimum) {
          weight += projection[index];
          centre += index * projection[index];
          index += 1;
        }
        bands.push({ centre: centre / Math.max(1, weight), weight: weight });
      }
      return bands;
    }

    function findTenLines(bands) {
      var best = null;
      for (var first = 0; first < bands.length - 9; first += 1) {
        for (var last = first + 9; last < bands.length; last += 1) {
          var step = (bands[last].centre - bands[first].centre) / 9;
          if (step < 7) continue;
          var lines = [bands[first].centre];
          var error = 0;
          var valid = true;
          for (var line = 1; line < 9; line += 1) {
            var expected = bands[first].centre + step * line;
            var closest = null;
            var distanceToClosest = Infinity;
            for (var option = first + 1; option < last; option += 1) {
              var distanceToOption = Math.abs(bands[option].centre - expected);
              if (distanceToOption < distanceToClosest) {
                closest = bands[option];
                distanceToClosest = distanceToOption;
              }
            }
            if (!closest || distanceToClosest > step * 0.23) {
              valid = false;
              break;
            }
            lines.push(closest.centre);
            error += distanceToClosest / step;
          }
          if (!valid) continue;
          lines.push(bands[last].centre);
          if (!best || error < best.error) best = { lines: lines, error: error / 8 };
        }
      }
      return best;
    }

    function projectionCandidates() {
      var histogram = new Uint32Array(256);
      tones.forEach(function (tone) { histogram[tone] += 1; });
      function quantile(amount) {
        var target = tones.length * amount;
        var total = 0;
        for (var shade = 0; shade < 256; shade += 1) {
          total += histogram[shade];
          if (total >= target) return shade;
        }
        return 128;
      }
      var limits = [Math.min(155, Math.max(45, quantile(0.22))), Math.max(70, Math.min(220, quantile(0.84)))];
      var results = [];
      [false, true].forEach(function (bright, pass) {
        var columns = new Uint32Array(width);
        var rows = new Uint32Array(height);
        for (var row = 0; row < height; row += 1) {
          for (var column = 0; column < width; column += 1) {
            var matches = bright ? tones[row * width + column] >= limits[pass] : tones[row * width + column] <= limits[pass];
            if (matches) {
              columns[column] += 1;
              rows[row] += 1;
            }
          }
        }
        var foundColumns = findTenLines(findBands(columns, Math.max(8, height * 0.1)));
        var foundRows = findTenLines(findBands(rows, Math.max(8, width * 0.1)));
        if (foundColumns && foundRows) {
          results.push({
            columns: foundColumns,
            rows: foundRows,
            score: 1 - (foundColumns.error + foundRows.error) / 2,
            method: bright ? "bright-projection" : "dark-projection"
          });
        }

        // Some apps intentionally make the nine inner cell dividers subtle
        // but retain the two bold box dividers. Two equally-spaced dividers
        // on each axis still determine the complete 9 x 9 square.
        var majorColumns = findBands(columns, Math.max(8, height * 0.055));
        var majorRows = findBands(rows, Math.max(8, width * 0.055));
        var bestMajor = null;
        for (var firstColumn = 0; firstColumn < majorColumns.length - 1; firstColumn += 1) {
          for (var secondColumn = firstColumn + 1; secondColumn < majorColumns.length; secondColumn += 1) {
            var columnStep = majorColumns[secondColumn].centre - majorColumns[firstColumn].centre;
            if (columnStep < Math.min(width, height) * 0.1) continue;
            for (var firstRow = 0; firstRow < majorRows.length - 1; firstRow += 1) {
              for (var secondRow = firstRow + 1; secondRow < majorRows.length; secondRow += 1) {
                var rowStep = majorRows[secondRow].centre - majorRows[firstRow].centre;
                if (rowStep < Math.min(width, height) * 0.1) continue;
                var left = majorColumns[firstColumn].centre - columnStep;
                var right = majorColumns[secondColumn].centre + columnStep;
                var top = majorRows[firstRow].centre - rowStep;
                var bottom = majorRows[secondRow].centre + rowStep;
                if (left < -4 || top < -4 || right > width + 4 || bottom > height + 4) continue;
                var aspect = Math.abs(Math.log((right - left) / Math.max(1, bottom - top)));
                var evidence = (majorColumns[firstColumn].weight / height + majorColumns[secondColumn].weight / height + majorRows[firstRow].weight / width + majorRows[secondRow].weight / width) / 4;
                var score = evidence - aspect * 0.5;
                if (!bestMajor || score > bestMajor.score) {
                  bestMajor = {
                    score: score,
                    columns: { lines: Array.from({ length: 10 }, function (_, line) { return left + columnStep * line / 3; }), error: 0 },
                    rows: { lines: Array.from({ length: 10 }, function (_, line) { return top + rowStep * line / 3; }), error: 0 }
                  };
                }
              }
            }
          }
        }
        if (bestMajor && bestMajor.score > 0.11) {
          results.push({
            columns: bestMajor.columns,
            rows: bestMajor.rows,
            score: Math.min(0.96, 0.72 + bestMajor.score * 0.35),
            method: bright ? "bright-box-dividers" : "dark-box-dividers",
            major: true
          });
        }
      });
      return results;
    }

    var best = null;
    var minimum = Math.max(64, Math.min(width, height) * 0.12);
    // Phone screenshots often place the board flush against a screen edge.
    // Do not discard a valid grid just because it occupies the full width.
    var maximum = Math.min(width, height) - 2;
    for (var size = minimum; size <= maximum; size *= 1.1) {
      var stride = Math.max(5, Math.round(size * 0.08));
      for (var top = 0; top + size < height; top += stride) {
        for (var left = 0; left + size < width; left += stride) {
          var candidate = evaluate(left, top, size);
          if (!best || candidate.score > best.score) best = { left: left, top: top, size: size, result: candidate };
        }
      }
    }
    projectionCandidates().forEach(function (projected) {
      var left = projected.columns.lines[0];
      var top = projected.rows.lines[0];
      var size = ((projected.columns.lines[9] - left) + (projected.rows.lines[9] - top)) / 2;
      var measured = evaluate(left, top, size);
      // The projection pass has already proved that ten repeated lines are
      // present. Combine that evidence with the edge-based check rather than
      // allowing either one to be a standalone false positive.
      var score = projected.score * 0.58 + measured.lineStrength * 0.22 + measured.regularity * 0.2;
      if (!best || score > best.result.score) {
        best = {
          left: left,
          top: top,
          size: size,
          result: {
            score: score,
            lineStrength: measured.lineStrength,
            regularity: Math.min(measured.regularity, projected.score),
            columns: projected.columns.lines,
            rows: projected.rows.lines,
            method: projected.method,
            major: projected.major
          }
        };
      }
    });
    var isMajorDividerDetection = best && best.result.major;
    if (!best || best.result.score < 0.6 || best.result.lineStrength < (isMajorDividerDetection ? 0.05 : 0.12) || best.result.regularity < (isMajorDividerDetection ? 0.6 : 0.76)) {
      return { grid: null, debug: { method: "axis", best: best && { score: Number(best.result.score.toFixed(3)), strength: Number(best.result.lineStrength.toFixed(3)), regularity: Number(best.result.regularity.toFixed(3)), method: best.result.method || "window-search", bounds: [Math.round(best.result.columns[0] / analysisScale), Math.round(best.result.rows[0] / analysisScale), Math.round(best.result.columns[9] / analysisScale), Math.round(best.result.rows[9] / analysisScale)] } } };
    }
    var columns = best.result.columns;
    var rows = best.result.rows;
    var scaleBack = 1 / analysisScale;
    return {
      grid: {
        points: [
          { x: columns[0] * scaleBack, y: rows[0] * scaleBack },
          { x: columns[9] * scaleBack, y: rows[0] * scaleBack },
          { x: columns[9] * scaleBack, y: rows[9] * scaleBack },
          { x: columns[0] * scaleBack, y: rows[9] * scaleBack }
        ],
        confidence: Math.max(0, Math.min(0.99, best.result.score)),
        method: "axis"
      },
      debug: {
        method: "axis",
        best: {
          score: Number(best.result.score.toFixed(3)),
          strength: Number(best.result.lineStrength.toFixed(3)),
          regularity: Number(best.result.regularity.toFixed(3)),
          method: best.result.method || "window-search",
          bounds: [Math.round(columns[0] * scaleBack), Math.round(rows[0] * scaleBack), Math.round(columns[9] * scaleBack), Math.round(rows[9] * scaleBack)]
        }
      }
    };
  }

  function loadOpenCv() {
    if (window.cv && window.cv.Mat) return Promise.resolve(window.cv);
    if (openCvPromise) return openCvPromise;
    openCvPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      var settled = false;
      var deadline = Date.now() + 60000;
      function fail(error) {
        if (settled) return;
        settled = true;
        reject(error);
      }
      function waitForRuntime() {
        if (settled) return;
        if (window.cv && window.cv.Mat) {
          settled = true;
          resolve(window.cv);
        } else if (Date.now() > deadline) fail(new Error("OpenCV did not finish loading."));
        else window.setTimeout(waitForRuntime, 80);
      }
      function initialiseRuntime() {
        // OpenCV 4.x browser builds expose either a ready-to-use object or an
        // Emscripten factory function. The bundled build resolves to a
        // Promise, while some CDN builds expose the factory directly.
        if (window.cv && typeof window.cv.then === "function") {
          Promise.resolve(window.cv).then(function (runtime) {
            if (settled) return;
            window.cv = runtime;
            waitForRuntime();
          }).catch(fail);
          return;
        }
        if (typeof window.cv === "function") {
          Promise.resolve(window.cv()).then(function (runtime) {
            if (settled) return;
            window.cv = runtime;
            waitForRuntime();
          }).catch(fail);
        } else {
          waitForRuntime();
        }
      }
      script.async = true;
      script.src = "./assets/opencv.js";
      script.onload = initialiseRuntime;
      script.onerror = function () { fail(new Error("OpenCV could not be downloaded.")); };
      document.head.appendChild(script);
      window.setTimeout(function () { fail(new Error("OpenCV did not finish loading.")); }, 61000);
    });
    return openCvPromise;
  }

  function orderCorners(points) {
    var ordered = [null, null, null, null];
    points.forEach(function (point) {
      var sum = point.x + point.y;
      var difference = point.x - point.y;
      if (!ordered[0] || sum < ordered[0].x + ordered[0].y) ordered[0] = point;
      if (!ordered[2] || sum > ordered[2].x + ordered[2].y) ordered[2] = point;
      if (!ordered[1] || difference > ordered[1].x - ordered[1].y) ordered[1] = point;
      if (!ordered[3] || difference < ordered[3].x - ordered[3].y) ordered[3] = point;
    });
    return ordered;
  }

  function distance(first, second) {
    return Math.hypot(second.x - first.x, second.y - first.y);
  }

  function quadrilateralInfo(points, imageArea) {
    var width = (distance(points[0], points[1]) + distance(points[3], points[2])) / 2;
    var height = (distance(points[0], points[3]) + distance(points[1], points[2])) / 2;
    var area = Math.abs(
      points[0].x * points[1].y + points[1].x * points[2].y + points[2].x * points[3].y + points[3].x * points[0].y -
      points[1].x * points[0].y - points[2].x * points[1].y - points[3].x * points[2].y - points[0].x * points[3].y
    ) / 2;
    var aspect = width / Math.max(1, height);
    if (width < 55 || height < 55 || area < imageArea * 0.002 || aspect < 0.45 || aspect > 2.2) return null;
    return { width: width, height: height, area: area, aspect: aspect };
  }

  function isSimilarCandidate(existing, candidate) {
    for (var index = 0; index < existing.length; index += 1) {
      var prior = existing[index];
      var centreDistance = 0;
      for (var corner = 0; corner < 4; corner += 1) centreDistance += distance(prior.points[corner], candidate.points[corner]);
      if (centreDistance / 4 < Math.min(prior.info.width, prior.info.height) * 0.07) return true;
    }
    return false;
  }

  function collectContourCandidates(cv, binary, imageArea, candidates, source) {
    var contours = new cv.MatVector();
    var hierarchy = new cv.Mat();
    try {
      cv.findContours(binary, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
      for (var index = 0; index < contours.size(); index += 1) {
        var contour = contours.get(index);
        var perimeter = cv.arcLength(contour, true);
        var area = Math.abs(cv.contourArea(contour));
        if (area < imageArea * 0.0015) {
          contour.delete();
          continue;
        }
        [0.012, 0.022, 0.035].forEach(function (epsilon) {
          var approximation = new cv.Mat();
          try {
            cv.approxPolyDP(contour, approximation, perimeter * epsilon, true);
            if (approximation.rows !== 4 || !cv.isContourConvex(approximation)) return;
            var values = approximation.data32S;
            var points = orderCorners([
              { x: values[0], y: values[1] }, { x: values[2], y: values[3] },
              { x: values[4], y: values[5] }, { x: values[6], y: values[7] }
            ]);
            var info = quadrilateralInfo(points, imageArea);
            var candidate = info && { points: points, info: info, source: source };
            if (candidate && !isSimilarCandidate(candidates, candidate)) candidates.push(candidate);
          } finally {
            approximation.delete();
          }
        });
        contour.delete();
      }
    } finally {
      contours.delete();
      hierarchy.delete();
    }
  }

  function projectionValues(cv, mat, vertical) {
    var reduced = new cv.Mat();
    try {
      cv.reduce(mat, reduced, vertical ? 0 : 1, cv.REDUCE_SUM, cv.CV_32S);
      var values = reduced.data32S;
      return Array.prototype.slice.call(values);
    } finally {
      reduced.delete();
    }
  }

  function regularlySpacedLines(projection, span) {
    var expectedStep = span / 9;
    var positions = [];
    var strengths = [];
    var error = 0;
    for (var line = 0; line <= 9; line += 1) {
      var expected = line * expectedStep;
      var radius = line === 0 || line === 9 ? expectedStep * 0.42 : expectedStep * 0.32;
      var start = Math.max(0, Math.floor(expected - radius));
      var end = Math.min(projection.length - 1, Math.ceil(expected + radius));
      var bestValue = -1;
      var bestPosition = Math.round(expected);
      for (var position = start; position <= end; position += 1) {
        if (projection[position] > bestValue) {
          bestValue = projection[position];
          bestPosition = position;
        }
      }
      positions.push(bestPosition);
      strengths.push(bestValue / Math.max(1, span * 255));
      error += Math.abs(bestPosition - expected) / expectedStep;
    }
    var strong = strengths.filter(function (value) { return value > 0.18; }).length / 10;
    var averageStrength = strengths.reduce(function (total, value) { return total + Math.min(1, value / 0.38); }, 0) / 10;
    return { positions: positions, strong: strong, averageStrength: averageStrength, error: error / 10 };
  }

  function scoreCandidate(cv, gray, candidate) {
    var sourcePoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
      candidate.points[0].x, candidate.points[0].y, candidate.points[1].x, candidate.points[1].y,
      candidate.points[2].x, candidate.points[2].y, candidate.points[3].x, candidate.points[3].y
    ]);
    var targetPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, BOARD_SIZE - 1, 0, BOARD_SIZE - 1, BOARD_SIZE - 1, 0, BOARD_SIZE - 1]);
    var transform = cv.getPerspectiveTransform(sourcePoints, targetPoints);
    var warped = new cv.Mat();
    var binary = new cv.Mat();
    var vertical = new cv.Mat();
    var horizontal = new cv.Mat();
    // A longer opening kernel preserves full grid strokes after rectification
    // while removing letter strokes from newspaper pages and app controls.
    var verticalKernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(1, 35));
    var horizontalKernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(35, 1));
    try {
      cv.warpPerspective(gray, warped, transform, new cv.Size(BOARD_SIZE, BOARD_SIZE), cv.INTER_LINEAR, cv.BORDER_REPLICATE);
      cv.adaptiveThreshold(warped, binary, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 31, 5);
      cv.morphologyEx(binary, vertical, cv.MORPH_OPEN, verticalKernel);
      cv.morphologyEx(binary, horizontal, cv.MORPH_OPEN, horizontalKernel);
      var verticalProjection = projectionValues(cv, vertical, true);
      var horizontalProjection = projectionValues(cv, horizontal, false);
      var columns = regularlySpacedLines(verticalProjection, BOARD_SIZE);
      var rows = regularlySpacedLines(horizontalProjection, BOARD_SIZE);
      var lineCoverage = (columns.strong + rows.strong) / 2;
      var strength = (columns.averageStrength + rows.averageStrength) / 2;
      var regularity = Math.max(0, 1 - (columns.error + rows.error) / 2);
      var squarePenalty = Math.abs(Math.log(candidate.info.aspect));
      function dividerPeak(projection, expected) {
        var peak = 0;
        for (var position = Math.max(0, expected - 18); position <= Math.min(projection.length - 1, expected + 18); position += 1) peak = Math.max(peak, projection[position]);
        return peak / (BOARD_SIZE * 255);
      }
      var dividerStrength = Math.min(
        (dividerPeak(verticalProjection, 150) + dividerPeak(verticalProjection, 300)) / 2,
        (dividerPeak(horizontalProjection, 150) + dividerPeak(horizontalProjection, 300)) / 2
      );
      candidate.metrics = { columns: columns, rows: rows, lineCoverage: lineCoverage, strength: strength, regularity: regularity, dividerStrength: dividerStrength };
      candidate.score = lineCoverage * 0.48 + strength * 0.24 + regularity * 0.24 + Math.min(0.04, candidate.info.area / (gray.rows * gray.cols) * 0.04) - squarePenalty * 0.08;
      if (candidate.source === "central-box-expansion") {
        candidate.score = Math.max(candidate.score, dividerStrength * 0.72 + regularity * 0.18 + 0.08);
      }
      return candidate;
    } finally {
      sourcePoints.delete();
      targetPoints.delete();
      transform.delete();
      warped.delete();
      binary.delete();
      vertical.delete();
      horizontal.delete();
      verticalKernel.delete();
      horizontalKernel.delete();
    }
  }

  function collectCandidates(cv, gray) {
    var adaptive = new cv.Mat();
    var edges = new cv.Mat();
    var kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
    var candidates = [];
    try {
      cv.adaptiveThreshold(gray, adaptive, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 31, 5);
      cv.morphologyEx(adaptive, adaptive, cv.MORPH_CLOSE, kernel);
      collectContourCandidates(cv, adaptive, gray.rows * gray.cols, candidates, "adaptive");
      cv.Canny(gray, edges, 35, 120);
      addHoughDividerCandidates(cv, edges, gray.rows * gray.cols, candidates);
      cv.dilate(edges, edges, kernel);
      collectContourCandidates(cv, edges, gray.rows * gray.cols, candidates, "edges");
      addBoxArrangementCandidates(candidates, gray.rows * gray.cols);
      addCentralBoxCandidates(candidates, gray.rows * gray.cols, gray.cols, gray.rows);
      return candidates;
    } finally {
      adaptive.delete();
      edges.delete();
      kernel.delete();
    }
  }

  function addHoughDividerCandidates(cv, edges, imageArea, candidates) {
    var lines = new cv.Mat();
    try {
      var smallestSide = Math.min(edges.cols, edges.rows);
      cv.HoughLinesP(edges, lines, 1, Math.PI / 180, 42, Math.max(35, smallestSide * 0.12), Math.max(8, smallestSide * 0.025));
      var vertical = [];
      var horizontal = [];
      for (var index = 0; index < lines.rows; index += 1) {
        var values = lines.data32S;
        var x1 = values[index * 4];
        var y1 = values[index * 4 + 1];
        var x2 = values[index * 4 + 2];
        var y2 = values[index * 4 + 3];
        var length = Math.hypot(x2 - x1, y2 - y1);
        if (Math.abs(x2 - x1) < Math.abs(y2 - y1) * 0.12) vertical.push({ position: (x1 + x2) / 2, length: length });
        if (Math.abs(y2 - y1) < Math.abs(x2 - x1) * 0.12) horizontal.push({ position: (y1 + y2) / 2, length: length });
      }
      function clusters(linesToCluster) {
        var grouped = clusterCentres(linesToCluster.map(function (line) { return line.position; }), 5);
        return grouped.map(function (group) {
          var evidence = 0;
          linesToCluster.forEach(function (line) {
            if (Math.abs(line.position - group.mean) < 6) evidence += line.length;
          });
          return { position: group.mean, evidence: evidence };
        });
      }
      var xLines = clusters(vertical);
      var yLines = clusters(horizontal);
      for (var firstX = 0; firstX < xLines.length - 1; firstX += 1) {
        for (var secondX = firstX + 1; secondX < xLines.length; secondX += 1) {
          var xGap = xLines[secondX].position - xLines[firstX].position;
          if (xGap < smallestSide * 0.1) continue;
          for (var firstY = 0; firstY < yLines.length - 1; firstY += 1) {
            for (var secondY = firstY + 1; secondY < yLines.length; secondY += 1) {
              var yGap = yLines[secondY].position - yLines[firstY].position;
              if (yGap < smallestSide * 0.1) continue;
              var left = xLines[firstX].position - xGap;
              var right = xLines[secondX].position + xGap;
              var top = yLines[firstY].position - yGap;
              var bottom = yLines[secondY].position + yGap;
              if (left < -4 || top < -4 || right > edges.cols + 4 || bottom > edges.rows + 4) continue;
              var points = [{ x: left, y: top }, { x: right, y: top }, { x: right, y: bottom }, { x: left, y: bottom }];
              var info = quadrilateralInfo(points, imageArea);
              var candidate = info && { points: points, info: info, source: "hough-box-dividers" };
              if (candidate && !isSimilarCandidate(candidates, candidate)) candidates.push(candidate);
            }
          }
        }
      }
    } finally {
      lines.delete();
    }
  }

  function candidateCentre(candidate) {
    return {
      x: (candidate.points[0].x + candidate.points[1].x + candidate.points[2].x + candidate.points[3].x) / 4,
      y: (candidate.points[0].y + candidate.points[1].y + candidate.points[2].y + candidate.points[3].y) / 4
    };
  }

  function clusterCentres(values, tolerance) {
    var clusters = [];
    values.sort(function (first, second) { return first - second; }).forEach(function (value) {
      var target = clusters[clusters.length - 1];
      if (!target || Math.abs(value - target.mean) > tolerance) {
        clusters.push({ mean: value, values: [value] });
      } else {
        target.values.push(value);
        target.mean += (value - target.mean) / target.values.length;
      }
    });
    return clusters;
  }

  // A photographed board often has no single closed outer contour. Its nine
  // 3 x 3 boxes, however, do form a regular 3 x 3 arrangement. Joining the
  // four corner boxes reconstructs the whole board without relying on a
  // filename, screen size, or any image-specific coordinates.
  function addBoxArrangementCandidates(candidates, imageArea) {
    var usable = candidates.filter(function (candidate) {
      return candidate.info.aspect > 0.72 && candidate.info.aspect < 1.38;
    });
    for (var seedIndex = 0; seedIndex < usable.length; seedIndex += 1) {
      var seed = usable[seedIndex];
      var side = (seed.info.width + seed.info.height) / 2;
      var similar = usable.filter(function (candidate) {
        var candidateSide = (candidate.info.width + candidate.info.height) / 2;
        return candidateSide > side * 0.72 && candidateSide < side * 1.32;
      });
      if (similar.length < 4) continue;
      var centres = similar.map(candidateCentre);
      var xClusters = clusterCentres(centres.map(function (centre) { return centre.x; }), side * 0.42);
      var yClusters = clusterCentres(centres.map(function (centre) { return centre.y; }), side * 0.42);
      if (xClusters.length !== 3 || yClusters.length !== 3) continue;
      var xGap = (xClusters[2].mean - xClusters[0].mean) / 2;
      var yGap = (yClusters[2].mean - yClusters[0].mean) / 2;
      if (xGap < side * 0.72 || xGap > side * 1.45 || yGap < side * 0.72 || yGap > side * 1.45) continue;
      function nearest(x, y) {
        var best = null;
        similar.forEach(function (candidate) {
          var centre = candidateCentre(candidate);
          var error = Math.hypot(centre.x - x, centre.y - y);
          if (!best || error < best.error) best = { candidate: candidate, error: error };
        });
        return best && best.error < side * 0.46 ? best.candidate : null;
      }
      var topLeft = nearest(xClusters[0].mean, yClusters[0].mean);
      var topRight = nearest(xClusters[2].mean, yClusters[0].mean);
      var bottomRight = nearest(xClusters[2].mean, yClusters[2].mean);
      var bottomLeft = nearest(xClusters[0].mean, yClusters[2].mean);
      if (!topLeft || !topRight || !bottomRight || !bottomLeft) continue;
      var points = [topLeft.points[0], topRight.points[1], bottomRight.points[2], bottomLeft.points[3]];
      var info = quadrilateralInfo(points, imageArea);
      var candidate = info && { points: points, info: info, source: "box-arrangement" };
      if (candidate && !isSimilarCandidate(candidates, candidate)) candidates.push(candidate);
    }
  }

  function addCentralBoxCandidates(candidates, imageArea, width, height) {
    var originals = candidates.slice();
    originals.forEach(function (candidate) {
      if (candidate.info.aspect < 0.72 || candidate.info.aspect > 1.38) return;
      var top = { x: candidate.points[1].x - candidate.points[0].x, y: candidate.points[1].y - candidate.points[0].y };
      var side = { x: candidate.points[3].x - candidate.points[0].x, y: candidate.points[3].y - candidate.points[0].y };
      var points = [
        { x: candidate.points[0].x - top.x - side.x, y: candidate.points[0].y - top.y - side.y },
        { x: candidate.points[1].x + top.x - side.x, y: candidate.points[1].y + top.y - side.y },
        { x: candidate.points[2].x + top.x + side.x, y: candidate.points[2].y + top.y + side.y },
        { x: candidate.points[3].x - top.x + side.x, y: candidate.points[3].y - top.y + side.y }
      ];
      if (points.some(function (point) { return point.x < -5 || point.y < -5 || point.x > width + 5 || point.y > height + 5; })) return;
      var info = quadrilateralInfo(points, imageArea);
      var expanded = info && { points: points, info: info, source: "central-box-expansion" };
      if (expanded && !isSimilarCandidate(candidates, expanded)) candidates.push(expanded);
    });
  }

  function detectWithOpenCv(cv, canvas) {
    var source = cv.imread(canvas);
    var gray = new cv.Mat();
    try {
      cv.cvtColor(source, gray, cv.COLOR_RGBA2GRAY);
      cv.medianBlur(gray, gray, 3);
      var candidates = collectCandidates(cv, gray);
      candidates.forEach(function (candidate) { scoreCandidate(cv, gray, candidate); });
      candidates.sort(function (first, second) { return second.score - first.score; });
      var best = candidates[0] || null;
      var threshold = 0.50;
      var centralBox = best && best.source === "central-box-expansion";
      var accepted = best && best.score >= threshold && best.metrics.regularity >= 0.68 && (best.metrics.lineCoverage >= 0.65 || centralBox && best.metrics.dividerStrength >= 0.42) ? best : null;
      return {
        grid: accepted && {
          points: accepted.points,
          confidence: Math.max(0, Math.min(0.99, accepted.score)),
          method: accepted.source
        },
        debug: {
          accepted: Boolean(accepted),
          threshold: threshold,
          candidates: candidates.slice(0, 12).map(function (candidate) {
            return {
              points: candidate.points,
              source: candidate.source,
              score: Number(candidate.score.toFixed(3)),
              coverage: Number(candidate.metrics.lineCoverage.toFixed(3)),
              regularity: Number(candidate.metrics.regularity.toFixed(3)),
              dividers: Number(candidate.metrics.dividerStrength.toFixed(3))
            };
          })
        }
      };
    } finally {
      source.delete();
      gray.delete();
    }
  }

  function drawPreview(target, source, grid) {
    target.width = source.width;
    target.height = source.height;
    var context = target.getContext("2d");
    context.drawImage(source, 0, 0);
    if (!grid) return;
    var points = grid.points;
    context.save();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var point = 1; point < points.length; point += 1) context.lineTo(points[point].x, points[point].y);
    context.closePath();
    context.fillStyle = "rgba(37, 99, 235, 0.14)";
    context.fill();
    context.strokeStyle = "#2563eb";
    context.lineWidth = Math.max(2, Math.round(Math.min(source.width, source.height) / 360));
    context.stroke();
    context.globalAlpha = 0.82;
    context.lineWidth = Math.max(1, context.lineWidth * 0.55);
    for (var line = 1; line < 9; line += 1) {
      var ratio = line / 9;
      var top = { x: points[0].x + (points[1].x - points[0].x) * ratio, y: points[0].y + (points[1].y - points[0].y) * ratio };
      var bottom = { x: points[3].x + (points[2].x - points[3].x) * ratio, y: points[3].y + (points[2].y - points[3].y) * ratio };
      var left = { x: points[0].x + (points[3].x - points[0].x) * ratio, y: points[0].y + (points[3].y - points[0].y) * ratio };
      var right = { x: points[1].x + (points[2].x - points[1].x) * ratio, y: points[1].y + (points[2].y - points[1].y) * ratio };
      context.beginPath();
      context.moveTo(top.x, top.y);
      context.lineTo(bottom.x, bottom.y);
      context.moveTo(left.x, left.y);
      context.lineTo(right.x, right.y);
      context.stroke();
    }
    context.restore();
  }

  function drawCellSegmentation(canvas, cellSize) {
    var context = canvas.getContext("2d");
    var size = canvas.width;
    context.save();
    context.strokeStyle = "rgba(37, 99, 235, 0.82)";
    for (var line = 0; line <= 9; line += 1) {
      var position = Math.round(line * cellSize) + 0.5;
      context.beginPath();
      context.lineWidth = line % 3 === 0 ? 2.5 : 1;
      context.moveTo(position, 0);
      context.lineTo(position, size);
      context.moveTo(0, position);
      context.lineTo(size, position);
      context.stroke();
    }
    context.restore();
  }

  function straightenGrid(sourceCanvas, grid, outputSize) {
    var size = outputSize || 720;
    return loadOpenCv().then(function (cv) {
      var source = cv.imread(sourceCanvas);
      var sourcePoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
        grid.points[0].x, grid.points[0].y, grid.points[1].x, grid.points[1].y,
        grid.points[2].x, grid.points[2].y, grid.points[3].x, grid.points[3].y
      ]);
      var targetPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, size - 1, 0, size - 1, size - 1, 0, size - 1]);
      var transform = cv.getPerspectiveTransform(sourcePoints, targetPoints);
      var straightened = new cv.Mat();
      try {
        cv.warpPerspective(source, straightened, transform, new cv.Size(size, size), cv.INTER_LINEAR, cv.BORDER_REPLICATE);
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        cv.imshow(canvas, straightened);
        var cleanCanvas = document.createElement("canvas");
        cleanCanvas.width = size;
        cleanCanvas.height = size;
        cleanCanvas.getContext("2d").drawImage(canvas, 0, 0);
        var cellSize = size / 9;
        drawCellSegmentation(canvas, cellSize);
        var cells = [];
        for (var row = 0; row < 9; row += 1) {
          for (var column = 0; column < 9; column += 1) {
            cells.push({ row: row, column: column, x: column * cellSize, y: row * cellSize, width: cellSize, height: cellSize });
          }
        }
        return { canvas: canvas, cleanCanvas: cleanCanvas, cells: cells, cellSize: cellSize };
      } finally {
        source.delete();
        sourcePoints.delete();
        targetPoints.delete();
        transform.delete();
        straightened.delete();
      }
    });
  }

  function analyzeCells(board) {
    return loadOpenCv().then(function (cv) {
      var source = cv.imread(board.cleanCanvas || board.canvas);
      var gray = new cv.Mat();
      var blurred = new cv.Mat();
      var binary = new cv.Mat();
      var kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(2, 2));
      var cells = [];
      var emptyCount = 0;
      var digitCount = 0;
      var pencilCount = 0;
      try {
        cv.cvtColor(source, gray, cv.COLOR_RGBA2GRAY);
        // A global Otsu cut after a small blur is less sensitive to paper
        // grain than adaptive thresholding, while preserving actual ink.
        cv.medianBlur(gray, blurred, 3);
        // Camera photos normally have dark ink on pale paper, while Sudoku
        // apps often show bright digits on a dark board. Choose the foreground
        // polarity from the board's overall luminance before thresholding.
        var lightInk = cv.mean(blurred)[0] < 128;
        cv.threshold(blurred, binary, 0, 255, (lightInk ? cv.THRESH_BINARY : cv.THRESH_BINARY_INV) + cv.THRESH_OTSU);
        cv.morphologyEx(binary, binary, cv.MORPH_OPEN, kernel);
        // Leave a generous margin: warped print and app grids can bleed well
        // past the nominal cell edge, but a full-size digit remains central.
        var inset = Math.max(6, Math.round(board.cellSize * 0.18));
        for (var index = 0; index < board.cells.length; index += 1) {
          var cell = board.cells[index];
          var x = Math.round(cell.x + inset);
          var y = Math.round(cell.y + inset);
          var size = Math.max(1, Math.round(cell.width - inset * 2));
          var region = binary.roi(new cv.Rect(x, y, size, size));
          var contours = new cv.MatVector();
          var hierarchy = new cv.Mat();
          var ink = cv.countNonZero(region);
          var largestArea = 0;
          var largestHeight = 0;
          var bounding = null;
          try {
            cv.findContours(region, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
            for (var contourIndex = 0; contourIndex < contours.size(); contourIndex += 1) {
              var contour = contours.get(contourIndex);
              var area = Math.abs(cv.contourArea(contour));
              if (area > largestArea) {
                largestArea = area;
                var rectangle = cv.boundingRect(contour);
                largestHeight = rectangle.height;
                bounding = { x: rectangle.x, y: rectangle.y, width: rectangle.width, height: rectangle.height };
              }
              contour.delete();
            }
          } finally {
            contours.delete();
            hierarchy.delete();
            region.delete();
          }
          var inkRatio = ink / (size * size);
          var kind = "empty";
          if (inkRatio >= 0.028) {
            kind = largestHeight >= size * 0.38 && largestArea >= size * size * 0.035 ? "digit" : "pencil";
          }
          if (kind === "empty") emptyCount += 1;
          else if (kind === "digit") digitCount += 1;
          else pencilCount += 1;
          cells.push({
            row: cell.row,
            column: cell.column,
            kind: kind,
            inkRatio: inkRatio,
            boundingBox: bounding,
            sourceX: x,
            sourceY: y,
            sourceSize: size
          });
        }
        return { cells: cells, counts: { empty: emptyCount, digit: digitCount, pencil: pencilCount } };
      } finally {
        source.delete();
        gray.delete();
        blurred.delete();
        binary.delete();
        kernel.delete();
      }
    });
  }

  function extractCellImage(board, cell, outputSize) {
    // Analysis results intentionally carry only semantic metadata. Resolve
    // their row/column back to the geometric cell before cropping for OCR.
    var sourceCell = typeof cell.x === "number" && typeof cell.width === "number"
      ? cell
      : board.cells[cell.row * 9 + cell.column];
    if (!sourceCell) throw new Error("Cell coordinates are unavailable.");
    var inset = Math.max(6, Math.round(board.cellSize * 0.18));
    var sourceSize = Math.max(1, Math.round(sourceCell.width - inset * 2));
    var targetSize = outputSize || 96;
    var canvas = document.createElement("canvas");
    canvas.width = targetSize;
    canvas.height = targetSize;
    canvas.getContext("2d").drawImage(
      board.cleanCanvas || board.canvas,
      Math.round(sourceCell.x + inset), Math.round(sourceCell.y + inset), sourceSize, sourceSize,
      0, 0, targetSize, targetSize
    );
    return canvas;
  }

  // OCR expects dark ink on a light background. Normalise either a photo or
  // a dark-mode screenshot to that convention, while keeping the same cell
  // crop used by the mark classifier. This deliberately returns a Promise:
  // OpenCV is lazily loaded only after someone chooses an image.
  function prepareCellForRecognition(board, cell, outputSize) {
    return loadOpenCv().then(function (cv) {
      var source = extractCellImage(board, cell, outputSize || 160);
      var input = cv.imread(source);
      var gray = new cv.Mat();
      var blurred = new cv.Mat();
      var binary = new cv.Mat();
      var padded = new cv.Mat();
      var rgba = new cv.Mat();
      var padding = Math.max(12, Math.round(source.width * 0.12));
      var output = document.createElement("canvas");
      output.width = source.width + padding * 2;
      output.height = source.height + padding * 2;
      try {
        cv.cvtColor(input, gray, cv.COLOR_RGBA2GRAY);
        cv.medianBlur(gray, blurred, 3);
        // Dark app boards have bright digits; paper boards have dark digits.
        // In both cases, create a white image with the digit in black.
        var lightInk = cv.mean(blurred)[0] < 128;
        cv.threshold(
          blurred,
          binary,
          0,
          255,
          (lightInk ? cv.THRESH_BINARY : cv.THRESH_BINARY_INV) + cv.THRESH_OTSU
        );
        cv.bitwise_not(binary, binary);
        // A white border prevents a large digit (especially 1 or 7) from
        // being interpreted as touching the edge of its tiny image.
        cv.copyMakeBorder(binary, padded, padding, padding, padding, padding, cv.BORDER_CONSTANT, new cv.Scalar(255));
        cv.cvtColor(padded, rgba, cv.COLOR_GRAY2RGBA);
        cv.imshow(output, rgba);
        return output;
      } finally {
        input.delete();
        gray.delete();
        blurred.delete();
        binary.delete();
        padded.delete();
        rgba.delete();
      }
    });
  }

  function detect(image) {
    var canvas = prepareImage(image);
    var axisResult = detectAxisAlignedGrid(canvas);
    return loadOpenCv().then(function (cv) {
      var result = detectWithOpenCv(cv, canvas);
      result.debug.axis = axisResult.debug;
      window.SudokuGridDetector.lastDebug = result.debug;
      return { canvas: canvas, grid: result.grid, debug: result.debug };
    });
  }

  window.SudokuGridDetector = {
    detect: detect,
    drawPreview: drawPreview,
    straightenGrid: straightenGrid,
    analyzeCells: analyzeCells,
    extractCellImage: extractCellImage,
    prepareCellForRecognition: prepareCellForRecognition,
    lastDebug: null
  };
}());
