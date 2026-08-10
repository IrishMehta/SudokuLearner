/*
 * Browser-local digit recognition for an already-straightened Sudoku board.
 * Tesseract runs in a Web Worker/WASM in the visitor's browser. The selected
 * photo stays in that browser; the first run downloads the public OCR runtime
 * and English model from jsDelivr, then the browser caches them.
 */
(function () {
  "use strict";

  var tesseractPromise;
  var workerPromise;
  var CDN_URL = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
  var SINGLE_CHARACTER_MODE = "10";
  var SPARSE_CHARACTER_MODE = "13";

  function loadTesseract() {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    if (tesseractPromise) return tesseractPromise;
    tesseractPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = CDN_URL;
      script.async = true;
      script.onload = function () {
        if (window.Tesseract) resolve(window.Tesseract);
        else reject(new Error("OCR library did not initialise."));
      };
      script.onerror = function () {
        reject(new Error("OCR library could not be downloaded."));
      };
      document.head.appendChild(script);
    });
    return tesseractPromise;
  }

  function getWorker(onProgress) {
    if (workerPromise) return workerPromise;
    workerPromise = loadTesseract().then(function (Tesseract) {
      return Tesseract.createWorker("eng", 1, {
        logger: function (event) {
          if (onProgress && event.status) onProgress(event.status, event.progress || 0);
        }
      });
    }).then(function (worker) {
      return worker.setParameters({
        tessedit_char_whitelist: "123456789",
        tessedit_pageseg_mode: SINGLE_CHARACTER_MODE
      }).then(function () { return worker; });
    }).catch(function (error) {
      workerPromise = null;
      throw error;
    });
    return workerPromise;
  }

  function firstDigit(text) {
    var match = String(text || "").match(/[1-9]/);
    return match ? match[0] : "";
  }

  function readResult(recognition) {
    return {
      value: firstDigit(recognition.data.text),
      confidence: typeof recognition.data.confidence === "number" ? recognition.data.confidence : 0
    };
  }

  function recognizeCell(worker, canvas) {
    return worker.recognize(canvas).then(function (primary) {
      var first = readResult(primary);
      // A single-character page mode is usually best. Re-try only weak or
      // empty reads with Tesseract's sparse-text mode; this often recovers
      // faint printed givens without making every image twice as slow.
      if (first.value && first.confidence >= 70) return first;
      return worker.setParameters({ tessedit_pageseg_mode: SPARSE_CHARACTER_MODE }).then(function () {
        return worker.recognize(canvas);
      }).then(function (secondary) {
        var second = readResult(secondary);
        return worker.setParameters({ tessedit_pageseg_mode: SINGLE_CHARACTER_MODE }).then(function () {
          if (!second.value) return first;
          if (!first.value || second.confidence >= first.confidence + 10) return second;
          return first;
        });
      });
    });
  }

  function recognize(board, analysis, onProgress) {
    if (!window.SudokuGridDetector || !window.SudokuGridDetector.prepareCellForRecognition) {
      return Promise.reject(new Error("The image preparation module is unavailable."));
    }
    var targetCells = analysis.cells.filter(function (cell) { return cell.kind === "digit"; });
    var resultCells = analysis.cells.map(function (cell) {
      return {
        row: cell.row,
        column: cell.column,
        kind: cell.kind,
        value: "",
        confidence: null
      };
    });
    var completed = 0;
    return getWorker(function (status, progress) {
      if (onProgress && completed === 0) onProgress({ phase: status, loaded: progress, total: targetCells.length });
    }).then(function (worker) {
      return targetCells.reduce(function (chain, cell) {
        return chain.then(function () {
          return window.SudokuGridDetector.prepareCellForRecognition(board, cell, 160).then(function (canvas) {
            return recognizeCell(worker, canvas);
          }).then(function (recognition) {
            var entry = resultCells[cell.row * 9 + cell.column];
            entry.value = recognition.value;
            entry.confidence = recognition.confidence;
            completed += 1;
            if (onProgress) onProgress({ phase: "Reading digits", loaded: completed, total: targetCells.length });
          });
        });
      }, Promise.resolve());
    }).then(function () {
      var read = resultCells.filter(function (cell) { return Boolean(cell.value); }).length;
      return {
        cells: resultCells,
        counts: { read: read, missed: targetCells.length - read, skipped: 81 - targetCells.length }
      };
    });
  }

  window.SudokuDigitRecognizer = {
    recognize: recognize
  };
}());
