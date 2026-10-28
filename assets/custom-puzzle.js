(function () {
  var samplePuzzle = [
    "530070000",
    "600195000",
    "098000060",
    "800060003",
    "400803001",
    "700020006",
    "060000280",
    "000419005",
    "000080079"
  ].join("\n");

  function cloneGrid(grid) {
    return grid.map(function (row) {
      return row.slice();
    });
  }

  function parsePuzzle(input) {
    var cells = [];

    for (var i = 0; i < input.length; i += 1) {
      var ch = input[i];
      if (/[1-9]/.test(ch)) {
        cells.push(Number(ch));
      } else if (/[0.\-_]/.test(ch)) {
        cells.push(null);
      } else if (/[\s,;|]/.test(ch)) {
        continue;
      } else {
        throw new Error("Unexpected character: " + ch);
      }
    }

    if (cells.length !== 81) {
      throw new Error("Expected 81 cells, found " + cells.length + ".");
    }

    var grid = [];
    for (var row = 0; row < 9; row += 1) {
      grid.push(cells.slice(row * 9, row * 9 + 9));
    }

    validateNoDuplicates(grid);
    var solutionCount = countSolutions(grid, 2);
    if (solutionCount === 0) {
      throw new Error("This puzzle has no valid solution.");
    }

    return { grid: grid, solutionCount: solutionCount };
  }

  function gridToText(inputs) {
    var cells = Array.prototype.map.call(inputs, function (input) {
      return /^[1-9]$/.test(input.value) ? input.value : "0";
    });
    var rows = [];
    for (var row = 0; row < 9; row += 1) {
      rows.push(cells.slice(row * 9, row * 9 + 9).join(""));
    }
    return rows.join("\n");
  }

  function fillEditor(inputs, input) {
    var cells = [];
    for (var i = 0; i < input.length; i += 1) {
      if (/[1-9]/.test(input[i])) cells.push(input[i]);
      else if (/[0.\-_]/.test(input[i])) cells.push("");
    }

    for (var cell = 0; cell < inputs.length; cell += 1) {
      inputs[cell].value = cells[cell] || "";
    }
  }

  function validateNoDuplicates(grid) {
    for (var i = 0; i < 9; i += 1) {
      validateUnit(grid[i], "Row " + (i + 1));
      validateUnit(grid.map(function (row) { return row[i]; }), "Column " + (i + 1));
    }

    for (var box = 0; box < 9; box += 1) {
      var cells = [];
      var startRow = Math.floor(box / 3) * 3;
      var startCol = (box % 3) * 3;
      for (var row = startRow; row < startRow + 3; row += 1) {
        for (var col = startCol; col < startCol + 3; col += 1) {
          cells.push(grid[row][col]);
        }
      }
      validateUnit(cells, "Box " + (Math.floor(box / 3) + 1) + "-" + ((box % 3) + 1));
    }
  }

  function validateUnit(cells, label) {
    var seen = new Set();
    for (var i = 0; i < cells.length; i += 1) {
      var value = cells[i];
      if (value === null) continue;
      if (seen.has(value)) {
        throw new Error(label + " has more than one " + value + ".");
      }
      seen.add(value);
    }
  }

  function canPlace(grid, row, col, value) {
    for (var i = 0; i < 9; i += 1) {
      if (grid[row][i] === value || grid[i][col] === value) return false;
    }

    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;
    for (var r = startRow; r < startRow + 3; r += 1) {
      for (var c = startCol; c < startCol + 3; c += 1) {
        if (grid[r][c] === value) return false;
      }
    }
    return true;
  }

  function countSolutions(grid, limit) {
    var work = cloneGrid(grid);
    var count = 0;

    function search() {
      if (count >= limit) return;

      var bestRow = -1;
      var bestCol = -1;
      var bestCandidates = null;

      for (var row = 0; row < 9; row += 1) {
        for (var col = 0; col < 9; col += 1) {
          if (work[row][col] !== null) continue;

          var candidates = [];
          for (var value = 1; value <= 9; value += 1) {
            if (canPlace(work, row, col, value)) candidates.push(value);
          }

          if (candidates.length === 0) return;
          if (bestCandidates === null || candidates.length < bestCandidates.length) {
            bestRow = row;
            bestCol = col;
            bestCandidates = candidates;
            if (candidates.length === 1) break;
          }
        }
        if (bestCandidates && bestCandidates.length === 1) break;
      }

      if (bestCandidates === null) {
        count += 1;
        return;
      }

      for (var i = 0; i < bestCandidates.length; i += 1) {
        work[bestRow][bestCol] = bestCandidates[i];
        search();
        work[bestRow][bestCol] = null;
        if (count >= limit) return;
      }
    }

    search();
    return count;
  }

  function showToast(message) {
    var toast = document.querySelector("[data-sudohint-import-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "sudohint-import-toast";
      toast.setAttribute("data-sudohint-import-toast", "");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("visible");
    }, 3600);
  }

  function demoFrame(title, note, target, cause, elimination, labels, givens) {
    return {
      title: title,
      note: note,
      target: target || [],
      cause: cause || [],
      elimination: elimination || [],
      labels: labels || {},
      givens: givens || {}
    };
  }

  var techniqueExamples = {
    "Naked Single": {
      summary: "One cell has only one candidate left.",
      frames: [demoFrame("The last candidate", "R5C5 can only be 5, so place 5 there.", [[4, 4]], [], [], {"4,4": "5"}, {"0,0": "5", "0,1": "3", "1,0": "6", "3,3": "8"})]
    },
    "Hidden Single": {
      summary: "A digit has only one possible cell in its row, column, or box.",
      frames: [demoFrame("The only 7 in Box 3", "In the highlighted box, only R2C8 includes candidate 7. Every other empty cell has a candidate list without 7, so place 7 in R2C8.", [[1, 7]], [], [], {"0,6": "1,2", "0,7": "2,4", "0,8": "2,4,8", "1,6": "2,3", "1,7": "7", "1,8": "2,3,4", "2,6": "1,2", "2,8": "2,4"})]
    },
    "Naked Pair": {
      summary: "Two cells in a unit contain the same two candidates.",
      frames: [demoFrame("A locked pair", "R2C2 and R2C5 are {2, 8}; remove 2 and 8 from the other cells in Row 2.", [], [[1, 1], [1, 4]], [[1, 0], [1, 7]], {"1,1": "{2,8}", "1,4": "{2,8}", "1,0": "-2/8", "1,7": "-2/8"}, {"0,0": "5", "0,3": "3", "2,2": "9"})]
    },
    "Naked Triple": {
      summary: "Three cells collectively contain only three candidates.",
      frames: [demoFrame("Three cells, three digits", "The cells in Row 4 contain only {1, 4, 9} between them, so those candidates leave the rest of the row.", [], [[3, 1], [3, 4], [3, 7]], [[3, 0], [3, 3], [3, 8]], {"3,1": "{1,4}", "3,4": "{1,9}", "3,7": "{4,9}", "3,0": "-1/4/9", "3,3": "-1/4/9", "3,8": "-1/4/9"}, {"2,0": "8", "4,4": "6"})]
    },
    "Naked Quad": {
      summary: "Four cells collectively contain only four candidates.",
      frames: [demoFrame("Four-cell lock", "These four cells use only {2, 3, 6, 9}; remove those candidates from every other cell in the unit.", [], [[4, 0], [4, 2], [4, 5], [4, 8]], [[4, 1], [4, 3], [4, 7]], {"4,0": "{2,3}", "4,2": "{2,6}", "4,5": "{6,9}", "4,8": "{3,9}", "4,1": "-2/3/6/9", "4,3": "-2/3/6/9", "4,7": "-2/3/6/9"}, {"3,3": "7", "5,5": "1"})]
    },
    "Hidden Pair": {
      summary: "Two digits are restricted to the same two cells.",
      frames: [demoFrame("The hidden pair", "Digits 3 and 6 can appear only in R6C3 and R6C6, so remove every other candidate from those cells.", [[5, 2], [5, 5]], [[5, 2], [5, 5]], [[5, 1], [5, 4], [5, 7]], {"5,2": "{3,6}", "5,5": "{3,6}", "5,1": "×3/6", "5,4": "×3/6", "5,7": "×3/6"}, {"4,0": "8", "4,8": "2"})]
    },
    "Hidden Triple": {
      summary: "Three digits are restricted to three cells in a unit.",
      frames: [demoFrame("Three hidden digits", "Digits 1, 5, and 8 appear only in these three cells; keep those digits and remove the rest.", [[6, 1], [6, 4], [6, 7]], [[6, 1], [6, 4], [6, 7]], [[6, 0], [6, 3], [6, 8]], {"6,1": "{1,5}", "6,4": "{5,8}", "6,7": "{1,8}", "6,0": "×1/5/8", "6,3": "×1/5/8", "6,8": "×1/5/8"}, {"5,0": "4", "8,8": "9"})]
    },
    "Hidden Quad": {
      summary: "Four digits are restricted to four cells in a unit.",
      frames: [demoFrame("Four hidden digits", "Digits 1, 4, 6, and 8 are confined to these four cells, so other candidates can be removed.", [[7, 0], [7, 3], [7, 6], [7, 8]], [[7, 0], [7, 3], [7, 6], [7, 8]], [[7, 1], [7, 4], [7, 7]], {"7,0": "{1,4}", "7,3": "{4,6}", "7,6": "{6,8}", "7,8": "{1,8}", "7,1": "×1/4/6/8", "7,4": "×1/4/6/8", "7,7": "×1/4/6/8"}, {"6,4": "2", "8,2": "7"})]
    },
    "Pointing Pair": {
      summary: "A box confines a digit to one row or column.",
      frames: [demoFrame("Pointing from a box", "In Box 1, every possible 4 lies in Row 2. Remove 4 from the rest of Row 2 outside the box.", [], [[1, 0], [1, 2]], [[1, 4], [1, 6], [1, 8]], {"1,0": "4", "1,2": "4", "1,4": "-4", "1,6": "-4", "1,8": "-4"}, {"0,0": "5", "0,1": "3", "2,2": "9"})]
    },
    "Box-Line Reduction": {
      summary: "A row or column confines a digit to one box.",
      frames: [demoFrame("Reducing into a box", "Row 7 can place 8 only inside Box 7, so remove 8 from the other cells in that box.", [], [[6, 0], [6, 2]], [[7, 0], [8, 1], [8, 2]], {"6,0": "8", "6,2": "8", "7,0": "-8", "8,1": "-8", "8,2": "-8"}, {"6,4": "1", "7,4": "6"})]
    },
    "X-Wing": {
      summary: "Two rows and two columns form a rectangle for one digit.",
      frames: [
        demoFrame("Find the rectangle", "Digit 5 appears in exactly the same two columns in Rows 2 and 7.", [], [[1, 2], [1, 7], [6, 2], [6, 7]], [], {"1,2": "5", "1,7": "5", "6,2": "5", "6,7": "5"}),
        demoFrame("Make the eliminations", "Any other 5 in Columns 3 or 8 can be removed because one corner of the X-Wing must be true.", [], [[1, 2], [1, 7], [6, 2], [6, 7]], [[0, 2], [3, 7], [8, 2]], {"1,2": "5", "1,7": "5", "6,2": "5", "6,7": "5", "0,2": "-5", "3,7": "-5", "8,2": "-5"})
      ]
    },
    "Finned X-Wing": {
      summary: "An almost X-Wing uses a fin to force an elimination.",
      frames: [demoFrame("The fin makes it work", "The fin cell adds the missing constraint. Whether the fin is true or false, the red candidates can be removed.", [[1, 2], [1, 7], [6, 2], [6, 7]], [[6, 3]], [[5, 7], [7, 7]], {"1,2": "5", "1,7": "5", "6,2": "5", "6,7": "5", "6,3": "fin 5", "5,7": "-5", "7,7": "-5"})]
    },
    "Swordfish": {
      summary: "Three rows use three columns for one digit.",
      frames: [demoFrame("A three-line fish", "Digit 4 is restricted to Columns 2, 5, and 8 across three rows. Remove other 4s from those columns.", [], [[0, 1], [0, 4], [1, 4], [1, 7], [2, 1], [2, 7]], [[5, 1], [7, 4], [8, 7]], {"0,1": "4", "0,4": "4", "1,4": "4", "1,7": "4", "2,1": "4", "2,7": "4", "5,1": "-4", "7,4": "-4", "8,7": "-4"})]
    },
    "Jellyfish": {
      summary: "Four rows use four columns for one digit.",
      frames: [demoFrame("A four-line fish", "Digit 7 is restricted to four columns across four rows, eliminating 7 from the remaining cells in those columns.", [], [[0, 0], [0, 3], [1, 3], [1, 6], [2, 0], [2, 8], [3, 6], [3, 8]], [[5, 0], [6, 3], [8, 6]], {"0,0": "7", "0,3": "7", "1,3": "7", "1,6": "7", "2,0": "7", "2,8": "7", "3,6": "7", "3,8": "7", "5,0": "-7", "6,3": "-7", "8,6": "-7"})]
    },
    "Skyscraper": {
      summary: "Two strong links share a base, forcing an elimination.",
      frames: [demoFrame("Two roofs, one conclusion", "At least one of the two blue roof cells must contain 6. A cell that sees both cannot contain 6.", [[1, 2], [4, 6]], [[1, 0], [1, 2], [4, 4], [4, 6]], [[3, 6]], {"1,2": "roof 6", "4,6": "roof 6", "1,0": "6", "4,4": "6", "3,6": "-6"})]
    },
    "Two-String Kite": {
      summary: "A row link and column link connect through a box.",
      frames: [demoFrame("The kite", "The two outer endpoints force one of the blue cells to be 3, so the shared red cell cannot be 3.", [[1, 1], [6, 5]], [[1, 5], [6, 1]], [[7, 7]], {"1,1": "3", "6,5": "3", "1,5": "3", "6,1": "3", "7,7": "-3"})]
    },
    "Simple Coloring": {
      summary: "Alternating colors on a strong-link chain reveal a contradiction.",
      frames: [demoFrame("Follow the colors", "The two same-color candidates see each other, so that color is impossible and its candidates can be removed.", [[1, 1], [3, 3], [5, 5]], [[1, 3], [3, 5], [5, 7]], [[4, 4]], {"1,1": "A", "3,3": "A", "5,5": "A", "1,3": "B", "3,5": "B", "5,7": "B", "4,4": "-8"})]
    },
    "W-Wing": {
      summary: "Two matching bivalue cells are joined by a strong link.",
      frames: [demoFrame("The two wings", "The wings share candidates {2, 7}; the strong link forces 7 into one wing, removing 7 from cells that see both.", [[1, 1], [6, 6]], [[3, 3], [3, 5]], [[4, 4]], {"1,1": "{2,7}", "6,6": "{2,7}", "3,3": "7", "3,5": "7", "4,4": "-7"})]
    },
    "XY-Wing": {
      summary: "Three bivalue cells force an elimination through a pivot.",
      frames: [demoFrame("The pivot and two wings", "Pivot {2,5} sees {2,7} and {5,7}; whichever value the pivot takes, 7 is forced into a wing. Remove 7 from the red cell.", [[4, 4]], [[2, 2], [6, 6]], [[4, 7]], {"4,4": "{2,5}", "2,2": "{2,7}", "6,6": "{5,7}", "4,7": "-7"})]
    },
    "XYZ-Wing": {
      summary: "A three-candidate pivot and two wings share a common candidate.",
      frames: [demoFrame("The three-value pivot", "The pivot {2,5,7} and wings force 7 into one of the blue cells, eliminating 7 from the shared red cell.", [[4, 4]], [[2, 2], [6, 6]], [[4, 7]], {"4,4": "{2,5,7}", "2,2": "{2,7}", "6,6": "{5,7}", "4,7": "-7"})]
    },
    "XY-Chain": {
      summary: "A chain of bivalue cells links the same candidate at both ends.",
      frames: [demoFrame("Link the chain", "The chain starts and ends with 4, so at least one endpoint is 4. Any cell seeing both endpoints cannot contain 4.", [[1, 1], [3, 3], [5, 5], [7, 7]], [], [[4, 4]], {"1,1": "{4,6}", "3,3": "{6,9}", "5,5": "{9,2}", "7,7": "{2,4}", "4,4": "-4"})]
    },
    "Unique Rectangle": {
      summary: "A rectangle pattern prevents a puzzle from having two solutions.",
      frames: [
        demoFrame("The deadly rectangle", "Three corners are bivalue {1,9}; the fourth corner must contain an extra candidate to avoid two solutions.", [[2, 2], [2, 6], [6, 2], [6, 6]], [], [], {"2,2": "{1,9}", "2,6": "{1,9}", "6,2": "{1,9}", "6,6": "{1,9,4}"}),
        demoFrame("Remove the pair", "Because the fourth corner has the extra 4, remove 1 and 9 from that corner.", [], [], [[6, 6]], {"6,6": "-1/-9"})
      ]
    }
  };

  // These are real solver positions, captured from the same solving engine the
  // app uses for hints.  Keeping the puzzle state with each example prevents
  // the teaching diagrams from showing candidate values that cannot occur.
  var verifiedExampleStates = {
    "Naked Single": { p: "035000000700000000068010509000108400080090000009400300000500902000004080007380041", t: [[8, 6]], h: [], e: [], v: 6, d: "R9C7 = 6" },
    "Hidden Single": { p: "035000000700000000068010509000108400080090000009400300000500932000004785007380641", t: [[6, 0]], h: [[0,0],[2,0],[3,0],[4,0],[5,0],[7,0],[8,0]], e: [], v: 8, d: "R7C1 = 8 — the only place in Column 1" },
    "Naked Pair": { p: "050008007408507206090060853860900002124873965079600081900300008080109004002780009", t: [[0,3],[2,3]], h: [[0,3],[2,3]], e: [[0,4,2],[0,4,4],[2,5,2],[2,5,4]], d: "Naked Pair {2, 4} in Box 2" },
    "Naked Triple": { p: "497280006000500040008000000875629413100358729923100005001035000000960301739010000", t: [[8,3],[8,5],[8,8]], h: [[8,3],[8,5],[8,8]], e: [[8,6,8],[8,6,2],[8,7,8]], d: "Naked Triple {2, 4, 8} in Row 9" },
    "Naked Quad": { p: "497280006000500040008000000875629413100358729923100005001035000000960301739010000", t: [[1,0],[1,1],[1,2],[1,5]], h: [[1,0],[1,1],[1,2],[1,5]], e: [[1,6,1],[1,6,2],[1,8,2]], d: "Naked Quad {1, 2, 3, 6} in Row 2" },
    "Hidden Pair": { p: "001004000064180005905000100510473900000000713307001050050000060000006507678030001", t: [[6,0],[6,4]], h: [[6,0],[6,4]], e: [[6,0,2],[6,4,2],[6,4,9]], d: "Hidden Pair {1, 4} in Row 7" },
    "Hidden Triple": { p: "105370000600000000080006350061290030008600200000830061800900003003500000000003046", t: [[1,4],[1,5],[0,5]], h: [[1,4],[1,5],[0,5]], e: [[1,4,1],[1,4,2],[1,4,4],[1,5,1],[1,5,2],[1,5,4],[0,5,2],[0,5,4]], d: "Hidden Triple {5, 8, 9} in Box 1–2" },
    "Hidden Quad": { p: "105370000600000000080006350061290030008600200000830061800900900003003500000000003046", t: [[0,5],[1,4],[1,5],[2,4]], h: [[0,5],[1,4],[1,5],[2,4]], e: [[0,5,4],[1,4,1],[1,4,4],[1,5,1],[1,5,4],[2,4,1],[2,4,4]], d: "Hidden Quad {2, 5, 8, 9} in Box 1–2" },
    "Pointing Pair": { p: "497280006000500040008000000875629413100358729923100005001035000000960301739010000", t: [[2,0],[2,1]], h: [[2,0],[2,1]], e: [[2,6,5],[2,7,5]], d: "5 in Box 1–1 points to Row 3" },
    "Box-Line Reduction": { p: "805010402017200050642050000250008900081090326000021005060030000109000538500109007", t: [[7,3],[7,4],[7,5]], h: [[7,3],[7,4],[7,5]], e: [[6,3,4],[6,5,4],[8,4,4]], d: "4 in Row 8 is confined to Box 3–2" },
    "X-Wing": { p: "341752689800193724792008351518000036029830075073005802284000000100000048900080060", t: [[4,5],[4,6],[8,5],[8,6]], h: [[4,5],[4,6],[8,5],[8,6]], e: [[6,5,1],[6,6,1]], d: "X-Wing on 1 in Rows 5 & 9" },
    "Finned X-Wing": { p: "050208007408507206297461853860910002124873965079600081900300008780109004002780009", t: [[1,1],[1,7],[8,1],[8,7],[8,6]], h: [[1,1],[1,7],[8,1],[8,7],[8,6]], e: [[6,7,1]], d: "Finned X-Wing on 1 in Rows 2 & 9" },
    "Swordfish": { p: "001004000064180005905000100510473900000000713307001050050000060000006507678030001", t: [[0,0],[4,0],[4,5],[6,5],[0,6],[6,6]], h: [[0,0],[4,0],[4,5],[6,5],[0,6],[6,6]], e: [[0,1,8],[4,1,8],[4,3,8],[6,3,8],[0,7,8],[0,8,8],[6,8,8]], d: "Swordfish on 8 in Rows 1, 5 & 7" },
    "Jellyfish": { p: "080060000509001070204507900006105429925004160000296350002000631001000700000010092", t: [[2,4],[2,7],[3,0],[3,4],[6,0],[6,5],[7,0],[7,5],[7,7]], h: [[2,4],[2,7],[3,0],[3,4],[6,0],[6,5],[7,0],[7,5],[7,7]], e: [[4,4,8],[8,0,8],[8,5,8]], d: "Jellyfish on 8 in Rows 3, 4, 7 & 8" },
    "Skyscraper": { p: "105370000600000000080006350061290030008600200000830061800900003003500000000003046", t: [[2,4],[2,3],[4,4],[4,5]], h: [[2,4],[2,3],[4,4],[4,5]], e: [[1,5,1]], d: "Skyscraper on 1" },
    "Two-String Kite": { p: "000020980409008060850009003000800000008207090070051008080002000000674829294385010", t: [[1,4],[1,1],[0,5],[3,5]], h: [[1,4],[1,1],[0,5],[3,5]], e: [[3,1,3]], d: "Two-String Kite removes 3 from R4C2" },
    "Simple Coloring": { p: "000300080009458027080106059001000000000600070040005000006000000070560090910703540", t: [[1,6],[2,6]], h: [[1,6],[2,6]], e: [[3,6,3]], d: "Simple Coloring removes 3 from R4C7" },
    "W-Wing": { p: "900231060036047009040906300069003150003004690020695038794068003685302940312409006", t: [[2,4],[4,0],[1,0],[1,3]], h: [[2,4],[4,0],[1,0],[1,3]], e: [[4,4,8]], d: "W-Wing {5, 8} removes 8 from R5C5" },
    "XY-Wing": { p: "900231060036047009040906300069003150003685302940312409006", t: [[0,6],[5,6],[0,2]], h: [[0,6],[5,6],[0,2]], e: [[5,2,7]], d: "XY-Wing: pivot R1C7, wings R6C7 & R1C3" },
    "XYZ-Wing": { p: "287600150041200070509071040153460708924700561876010034715000600408006017002107485", t: [[1,8],[1,0],[0,8]], h: [[1,8],[1,0],[0,8]], e: [[1,6,3]], d: "XYZ-Wing: pivot R2C9" },
    "XY-Chain": { p: "497280006000500040008000000875629413100358729923100005001035000000960301739010000", t: [[0,5],[0,6],[8,6],[5,6],[1,6],[2,7]], h: [[0,5],[0,6],[8,6],[5,6],[1,6],[2,7]], e: [[0,7,3],[2,5,3]], d: "XY-Chain eliminates 3 from R1C8 and R3C6" },
    "Unique Rectangle": { p: "001004000064180005905000100510473900000000713307001050050000060000006507678030001", t: [[6,0],[6,4],[7,0],[7,4]], h: [[6,0],[6,4],[7,0],[7,4]], e: [[7,0,1],[7,0,4]], d: "Unique Rectangle removes 1 and 4 from R8C1" }
  };

  verifiedExampleStates["Hidden Quad"].p = "105370000600000000080006350061290030008600200000830061800900003003500000000003046";
  verifiedExampleStates["XY-Wing"].p = "900231060036047009040906300069003150003004690020695038794068003685302940312409006";

  var exampleLessons = {
    "Naked Single": { title: "Only one digit fits", note: "R9C7 has just one pencil mark left: 6. Put 6 in R9C7." },
    "Hidden Single": { title: "Find the only 8 in Column 1", note: "Scan Column 1 for the candidate 8. It appears in only one empty cell, R7C1, so R7C1 must be 8." },
    "Naked Pair": { title: "Lock the pair {2, 4}", note: "In Box 2, the two orange cells can contain only 2 and 4. Those digits must be used there, so cross 2 and 4 out of the red cells." },
    "Naked Triple": { title: "Lock the triple {2, 4, 8}", note: "The three orange cells in Row 9 use only 2, 4, and 8 between them. Remove those digits from every other cell in that row; the red cells show the removals." },
    "Naked Quad": { title: "Lock four digits in four cells", note: "The four orange cells in Row 2 contain only 1, 2, 3, and 6. Those four digits must stay in those cells, so remove 1 and 2 from the red cells." },
    "Hidden Pair": { title: "Keep {1, 4} in these two cells", note: "In Row 7, only the two orange cells can hold 1 or 4. Keep 1 and 4 there: erase 2 from R7C1, then erase 2 and 9 from R7C5." },
    "Hidden Triple": { title: "Keep {5, 8, 9} in this box", note: "Within Box 1-2, digits 5, 8, and 9 can appear only in the three orange cells. Remove every other pencil mark from those cells; the red marks are the ones to erase." },
    "Hidden Quad": { title: "Keep {2, 5, 8, 9} in this box", note: "Within Box 1-2, only the four orange cells can hold 2, 5, 8, or 9. Erase the red pencil marks from those four cells." },
    "Pointing Pair": { title: "The box points along Row 3", note: "Inside the top-left box, 5 can only go in the two orange cells on Row 3. Therefore 5 cannot appear elsewhere on Row 3, so erase it from the red cells." },
    "Box-Line Reduction": { title: "The row locks 4 into one box", note: "On Row 8, every possible 4 sits inside the middle-bottom box. That means the other cells in that box cannot be 4; erase the red 4s." },
    "X-Wing": { title: "Match the two rows", note: "Rows 5 and 9 each restrict digit 1 to the same two columns. One 1 must land in each row, so remove 1 from the red cells in those columns." },
    "Finned X-Wing": { title: "Use the extra fin", note: "The orange cells nearly make an X-Wing on 1. The extra orange fin fixes the pattern, which lets you remove 1 from the red cell." },
    "Swordfish": { title: "Trace the three-row fish", note: "Across Rows 1, 5, and 7, digit 8 is limited to the same three columns. Those rows claim the 8s, so erase 8 from the red cells in those columns." },
    "Jellyfish": { title: "Trace the four-row fish", note: "Across Rows 3, 4, 7, and 8, digit 8 is limited to the same four columns. Those rows claim the 8s, so erase 8 from the red cells in those columns." },
    "Skyscraper": { title: "Follow the two strong links", note: "One of the two orange roof cells must be 1. The red cell sees both roofs, so it cannot also be 1; erase that pencil mark." },
    "Two-String Kite": { title: "Join the row and column links", note: "The orange cells form one row link and one column link for digit 3. At least one outer endpoint is 3, so the red cell cannot be 3." },
    "Simple Coloring": { title: "Eliminate the candidate that sees both colors", note: "Follow the two alternating color chains for digit 3. The red cell sees both possible colors, so whichever color is true, this cell cannot be 3." },
    "W-Wing": { title: "Connect the matching wings", note: "The two orange cells both contain {5, 8}. The orange link forces one wing to be 8, so the red cell, which sees both wings, cannot be 8." },
    "XY-Wing": { title: "Use the pivot and two wings", note: "The orange pivot shares one candidate with each orange wing. Whichever value the pivot takes, one wing becomes 7, so remove 7 from the red cell that sees both wings." },
    "XYZ-Wing": { title: "Use the three-candidate pivot", note: "The orange pivot has three candidates, while both wings share 3. One wing must be 3, so the red cell that sees the pivot and both wings cannot be 3." },
    "XY-Chain": { title: "Follow the chain from one end to the other", note: "The orange bivalue cells link the candidate 3 from one end of the chain to the other. A red cell sees both ends, so it cannot contain 3." },
    "Unique Rectangle": { title: "Avoid the deadly rectangle", note: "The four orange corners would create two solutions if R8C1 were only {1, 4}. Remove 1 and 4 from the red corner, leaving its extra candidate." }
  };

  /* Advanced patterns need a proof in small pieces. The first board isolates
     what to notice; the second turns that observation into the elimination. */
  var guidedTechniqueSteps = {
    "Naked Pair": [
      { title: "Step 1: Find two cells with the same two candidates", note: "The two orange cells contain only the same two digits. Those two digits must be placed in these two cells, in either order." },
      { title: "Step 2: Remove the pair from the rest of the unit", note: "Because the pair already occupies the two digits in this row, column, or box, no other cell in that unit can keep either red candidate." }
    ],
    "Naked Triple": [
      { title: "Step 1: Find three cells sharing only three digits", note: "Across the three orange cells, there are only three possible digits in total. Those three digits must be distributed among these three cells." },
      { title: "Step 2: Clear those digits from every other cell", note: "The triple has claimed all three digits in this unit. Erase the matching red candidates from the other cells in the same row, column, or box." }
    ],
    "Naked Quad": [
      { title: "Step 1: Find four cells sharing only four digits", note: "The four orange cells collectively use only four digits. However they are arranged, those digits must stay inside these four cells." },
      { title: "Step 2: Remove the four digits elsewhere", note: "No other cell in the unit can use any digit already reserved by the quad. The red pencil marks are the candidates to erase." }
    ],
    "Hidden Pair": [
      { title: "Step 1: Scan for two digits with only two homes", note: "In this unit, the pair digits appear as candidates only in the two orange cells. They may have extra pencil marks, which is why the pair is hidden." },
      { title: "Step 2: Keep only the hidden pair", note: "Those two cells must hold the two pair digits. Any other candidate in either orange cell is impossible, so erase the red pencil marks." }
    ],
    "Hidden Triple": [
      { title: "Step 1: Find three digits limited to three cells", note: "The three highlighted digits can appear only in the three orange cells of this unit. The cells may contain other pencil marks too." },
      { title: "Step 2: Keep the three hidden digits", note: "Since those cells must contain the hidden triple, every other candidate in them can be removed. The red marks show exactly what to erase." }
    ],
    "Hidden Quad": [
      { title: "Step 1: Find four digits limited to four cells", note: "Only the four orange cells can hold these four highlighted digits. That is enough to lock the digits there, even if the cells show extra candidates." },
      { title: "Step 2: Erase every extra candidate in the four cells", note: "The hidden quad fills these four cells between them. Remove the red pencil marks, leaving only the four locked digits." }
    ],
    "Pointing Pair": [
      { title: "Step 1: Look inside one 3×3 box", note: "Within the highlighted box, this digit can appear only in the two orange cells. Notice that both cells line up in the same row or column." },
      { title: "Step 2: Point outside the box", note: "One orange cell must contain the digit, so the same row or column cannot contain it anywhere outside this box. Erase the red candidates." }
    ],
    "Box-Line Reduction": [
      { title: "Step 1: Look along one row or column", note: "In the highlighted row or column, every possible copy of this digit lies inside one 3×3 box. The digit is locked into that box." },
      { title: "Step 2: Reduce the rest of the box", note: "Since the row or column must place the digit inside this box, other cells in that box cannot contain it. Erase the red candidates." }
    ],
    "X-Wing": [
      { title: "Step 1: Find matching pairs", note: "Look only at candidate {digit}. In the two highlighted rows, {digit} can appear only in the same two columns. Those four cells are the corners of the X-Wing." },
      { title: "Step 2: Claim the two columns", note: "Each highlighted row must place {digit} in one of its two corners. That claims {digit} in each of the two columns, so cross {digit} out of the red cells in those columns." }
    ],
    "Finned X-Wing": [
      { title: "Step 1: Find the almost-rectangle", note: "Start with the highlighted {digit}s: they nearly make an X-Wing. The extra highlighted cell is the fin; it sits in the same 3×3 box as one corner." },
      { title: "Step 2: Use the fin to make one safe removal", note: "Either the fin is {digit}, or the regular X-Wing corners must contain {digit}. In both cases, the red cell sees {digit}, so its candidate can be erased." }
    ],
    "Swordfish": [
      { title: "Step 1: Follow one digit across three rows", note: "Ignore every digit except {digit}. Across the three highlighted rows, all possible {digit}s lie in only three columns. This is a three-row fish." },
      { title: "Step 2: Those columns are spoken for", note: "The three rows must place their {digit}s inside those three columns. No other row can use {digit} in those columns, so erase the red candidates." }
    ],
    "Jellyfish": [
      { title: "Step 1: Follow one digit across four rows", note: "Look only at {digit}. The highlighted candidates in four rows are confined to four columns. This is the larger, four-row version of Swordfish." },
      { title: "Step 2: Reserve the four columns", note: "Those four rows must use the four columns for their {digit}s. Any other {digit} in one of those columns is impossible, so erase the red candidates." }
    ],
    "Skyscraper": [
      { title: "Step 1: Find two strong links", note: "Each highlighted pair is a strong link for digit {digit}: exactly one cell in each pair must be {digit}. The two outer cells are called the roofs." },
      { title: "Step 2: Check the cell that sees both roofs", note: "At least one roof must be {digit}. The red cell sees both roofs, so it would conflict with that digit whichever roof is chosen. Erase it from the red cell." }
    ],
    "Two-String Kite": [
      { title: "Step 1: Join a row link to a column link", note: "For digit {digit}, one highlighted pair is a row strong link and the other is a column strong link. They meet through the same 3×3 box, forming the kite." },
      { title: "Step 2: Use the two outer endpoints", note: "One of the two outer endpoints must be {digit}. The red cell sees both endpoints, so it cannot also be {digit}. Erase that candidate." }
    ],
    "Simple Coloring": [
      { title: "Step 1: Color a chain of strong links", note: "Follow candidate {digit} through strong links, alternating two colors as you go. Every strong link says one endpoint must be true and the other false." },
      { title: "Step 2: Find the color contradiction", note: "When two cells of the same color see each other, that color cannot be true. The red candidate sees both possible colors, so it cannot be {digit} and can be erased." }
    ],
    "W-Wing": [
      { title: "Step 1: Find matching two-candidate wings", note: "The two highlighted wing cells have the same two candidates. A separate strong link on one of those digits connects the wings' units." },
      { title: "Step 2: One wing must take the shared digit", note: "The strong link forces the shared candidate into one wing or the other. A red cell that sees both wings therefore cannot contain that candidate. Erase it." }
    ],
    "XY-Wing": [
      { title: "Step 1: Read the pivot and its two wings", note: "The pivot has two candidates. Each wing shares one pivot candidate, and both wings share a third candidate. Notice that common candidate in the highlighted cells." },
      { title: "Step 2: Test the pivot's two choices", note: "Whichever value the pivot takes, one wing is forced to the common candidate. The red cell sees both wings, so it cannot keep that common candidate. Erase it." }
    ],
    "XYZ-Wing": [
      { title: "Step 1: Start from the three-candidate pivot", note: "The pivot contains three candidates. Its two wings each share one pivot candidate and also share one common candidate with each other." },
      { title: "Step 2: The common candidate must appear nearby", note: "No matter which pivot value is chosen, one wing must take the common candidate. A cell that sees the pivot and both wings cannot contain it, so erase the red candidate." }
    ],
    "XY-Chain": [
      { title: "Step 1: Follow the alternating two-candidate chain", note: "Each highlighted cell has two candidates. Moving through the chain alternates which candidate would be true, until the same digit appears at both ends." },
      { title: "Step 2: Compare the two ends", note: "At least one end of the chain must contain the repeated digit. The red cells see both ends, so they cannot contain that digit. Erase the red candidates." }
    ],
    "Unique Rectangle": [
      { title: "Step 1: Spot the almost-rectangle", note: "The four highlighted cells form a rectangle with the same two main candidates. If all four were only that pair, the puzzle could have two solutions." },
      { title: "Step 2: Keep the extra candidate", note: "The red corner has an extra candidate, which prevents the ambiguous rectangle. The pair candidates must be removed from that corner, leaving its extra candidate." }
    ]
  };

  function exampleCellKey(row, col) {
    return row + "," + col;
  }

  function escapeExampleText(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function exampleMark(frame, row, col) {
    var key = exampleCellKey(row, col);
    if (frame.target.some(function (cell) { return exampleCellKey(cell[0], cell[1]) === key; })) return "target";
    if ((frame.colorA || []).some(function (cell) { return exampleCellKey(cell[0], cell[1]) === key; })) return "color-a";
    if ((frame.colorB || []).some(function (cell) { return exampleCellKey(cell[0], cell[1]) === key; })) return "color-b";
    if (frame.cause.some(function (cell) { return exampleCellKey(cell[0], cell[1]) === key; })) return "cause";
    if (frame.elimination.some(function (cell) { return exampleCellKey(cell[0], cell[1]) === key; })) return "elimination";
    return "";
  }

  function exampleCandidates(puzzle, row, col) {
    var used = {};
    var index = row * 9 + col;
    if (!puzzle || puzzle[index] !== "0") return "";

    for (var i = 0; i < 9; i += 1) {
      used[puzzle[row * 9 + i]] = true;
      used[puzzle[i * 9 + col]] = true;
    }
    var boxRow = Math.floor(row / 3) * 3;
    var boxCol = Math.floor(col / 3) * 3;
    for (var boxIndex = 0; boxIndex < 9; boxIndex += 1) {
      used[puzzle[(boxRow + Math.floor(boxIndex / 3)) * 9 + boxCol + (boxIndex % 3)]] = true;
    }

    var candidates = [];
    for (var digit = 1; digit <= 9; digit += 1) {
      if (!used[String(digit)]) candidates.push(digit);
    }
    return candidates.join("");
  }

  /* These are separate positions found by the same hint solver. They are not
     rotations, mirrors, or digit swaps of the first board: each one has its
     own givens, candidate layout, pattern cells, and elimination. */
  var curatedExampleLevels = ["Easy", "Medium", "Hard"];
  var curatedExampleAdditions = {
    "Naked Single": [
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[0,7]], e: [], v: 6 },
      { p: "000000070000080000000070500070060000000008100100000006200000015063214790000050000", t: [[7,8]], e: [], v: 8 }
    ],
    "Hidden Single": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[4,6]], h: [[4,1],[4,3],[4,4],[4,7]], e: [], v: 7 },
      { p: "000005809000400000045070012206103000038040001000000000000014720000892005080000000", t: [[0,7]], h: [[0,0],[0,1],[0,2],[0,3],[0,4]], e: [], v: 4 }
    ],
    "Naked Pair": [
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[3,1],[3,7]], e: [[3,2,5],[3,3,5],[3,3,8],[3,4,5],[3,4,8]] },
      { p: "083006000000700200200831765947000000000080006860405100070690301010300859029508000", t: [[6,5],[6,7]], e: [[6,0,4],[6,2,4]] }
    ],
    "Naked Triple": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[5,0],[5,1],[5,2]], e: [[5,7,2],[5,7,5],[5,8,5],[5,8,6]] },
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[3,1],[3,2],[3,7]], e: [[3,3,5],[3,3,8],[3,3,3],[3,4,5],[3,4,8],[3,4,3]] }
    ],
    "Naked Quad": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[4,1],[5,0],[5,1],[5,2]], e: [[3,0,2],[3,0,4],[3,0,5],[3,0,6],[3,2,2],[3,2,4],[3,2,5],[3,2,6]] },
      { p: "000005809000400000045070012206103000038040001000000000000014720000892005080000000", t: [[1,6],[1,7],[1,8],[2,6]], e: [[0,7,3],[0,7,6],[0,7,7]] }
    ],
    "Hidden Pair": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[3,0],[3,2]], e: [[3,0,2],[3,0,4],[3,0,5],[3,0,6],[3,2,2],[3,2,4],[3,2,5],[3,2,6]] },
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[3,3],[3,4]], e: [[3,3,3],[3,3,5],[3,3,8],[3,4,3],[3,4,5],[3,4,8]] }
    ],
    "Hidden Triple": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[3,0],[3,2],[4,1]], e: [[3,0,2],[3,0,5],[3,0,6],[3,2,2],[3,2,5],[3,2,6],[4,1,2],[4,1,5],[4,1,6]] },
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[4,2],[3,2],[1,2]], e: [[4,2,5],[4,2,9],[3,2,5],[1,2,2],[1,2,5],[1,2,9]] }
    ],
    "Hidden Quad": [
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[0,3],[0,8],[0,2],[0,0]], e: [[0,3,6],[0,0,6]] },
      { p: "000000070000080000000070500070060000000008100100000006200000015063214790000050000", t: [[8,6],[8,7],[8,8],[6,6]], e: [[8,6,8],[8,7,8],[8,8,8],[6,6,8]] }
    ],
    "Pointing Pair": [
      { p: "000005809000400000045070012206103000038040001000000000000014720000892005080000000", t: [[5,0],[5,2]], e: [[5,6,4],[5,7,4],[5,8,4]] },
      { p: "040300000300000090061209050104008506000000000003001002006400800009000040400102000", t: [[6,4],[8,4]], e: [[3,4,9],[4,4,9],[5,4,9]] }
    ],
    "Box-Line Reduction": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[5,7],[5,8]], e: [[3,6,3],[3,7,3],[3,8,3]] },
      { p: "000005809000400000045070012206103000038040001000000000000014720000892005080000000", t: [[0,0],[0,1],[0,2]], e: [[1,0,1],[1,1,1],[1,2,1]] }
    ],
    "X-Wing": [
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[0,0],[1,0],[0,7],[1,7]], e: [[0,3,6],[1,3,6],[1,4,6],[1,5,6]] },
      { p: "083006000000700200200831765947000000000080006860405100070690301010300859029508000", t: [[1,7],[1,8],[5,7],[5,8]], e: [[3,7,3],[3,8,3],[4,7,3]] }
    ],
    "Finned X-Wing": [
      { p: "040300000300000090061209050104008506000000000003001002006400800009000040400102000", t: [[2,4],[2,6],[5,4],[5,6],[2,8]], e: [[1,6,4]] },
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[0,2],[0,3],[6,2],[6,3],[6,4],[6,5]], e: [[8,3,2]] }
    ],
    "Swordfish": [
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[5,0],[5,3],[5,4],[7,0],[7,3],[7,4],[8,0],[8,3],[8,4]], e: [[3,3,3],[3,4,3]] },
      { p: "000300009009000140300100000901000000400069070000001300000000000600000500503700400", t: [[3,4],[6,4],[7,4],[3,5],[6,5],[7,5],[6,7],[7,7]], e: [[3,1,3],[6,8,3],[7,8,3]] }
    ],
    "Jellyfish": [
      { p: "000005809000400000045070012206103000038040001000000000000014720000892005080000000", t: [[0,0],[0,1],[0,2],[5,0],[5,1],[5,2],[7,0],[7,1],[7,2],[7,6],[8,0],[8,2],[8,6]], e: [[1,0,1],[1,1,1],[1,2,1]] },
      { p: "000000070000080000000070500070060000000008100100000006200000015063214790000050000", t: [[1,0],[1,2],[5,3],[5,5],[6,2],[6,3],[6,5],[8,0],[8,2],[8,3],[8,5]], e: [[4,3,7]] }
    ],
    "Skyscraper": [
      { p: "083006000000700200200831765947000000000080006860405100070690301010300859029508000", t: [[5,2],[4,2],[5,8],[3,8]], e: [[4,7,2]] },
      { p: "160009000000300090370020600520080009708002410430090080000600800080275001013040567", t: [[2,5],[2,3],[6,5],[6,4]], e: [[1,4,1]] }
    ],
    "Two-String Kite": [
      { p: "040300000300000090061209050104008506000000000003001002006400800009000040400102000", t: [[5,4],[5,6],[4,5],[1,5]], e: [[1,6,4]] },
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[0,2],[0,3],[1,1],[8,1]], e: [[8,3,2]] }
    ],
    "Simple Coloring": [
      { p: "000600070000000004000004000070000000903001008000487100000000060000900000000100002", t: [[5,7],[5,8]], e: [[3,6,3]] },
      { p: "300090800070000000000070001001509037003810000759030120030260004200003000000700010", t: [[1,0],[6,0],[0,1],[6,5],[7,1],[7,3]], e: [[0,5,1]], complex: true }
    ],
    "W-Wing": [
      { p: "083006000000700200200831765947000000000080006860405100070690301010300859029508000", t: [[1,4],[6,0],[0,0],[0,4]], e: [[1,0,4]] },
      { p: "709602000410070006002948000206400000341007060000230000080769500600100300000823600", t: [[0,4],[3,5],[1,3],[4,3]], e: [[3,4,1]] }
    ],
    "XY-Wing": [
      { p: "083006000000700200200831765947000000000080006860405100070690301010300859029508000", t: [[1,1],[1,4],[1,5]], e: [[0,4,4],[1,0,4],[1,2,4],[1,7,4],[1,8,4]] },
      { p: "049610000100000076068403901810009200070020000052008100001094700000030040090200810", t: [[1,1],[1,5],[1,2]], e: [[1,3,5],[1,4,5],[1,6,5]] }
    ],
    "XYZ-Wing": [
      { p: "805000300907302486603040957000900070390700024058023090000500230506000009009804000", t: [[7,6],[7,5],[6,8]], e: [[7,7,1]] },
      { p: "000000890060000057070080000920476508740800206000203700000060304406500900008000105", t: [[4,2],[3,2],[5,2]], e: [[0,2,1],[1,2,1],[2,2,1],[5,0,1],[5,1,1],[6,2,1]] }
    ],
    "XY-Chain": [
      { p: "083006000000700200200831765947000000000080006860405100070690301010300859029508000", t: [[1,1],[1,5],[1,4]], e: [[1,0,5],[1,2,5]] },
      { p: "300105802000000000100900004760000005510200000090030008900608000005709400027000650", t: [[5,2],[5,0],[8,0],[7,1],[6,1]], e: [[6,2,4]], complex: true }
    ],
    "Unique Rectangle": [
      { p: "070043800000000000130000045200001904000004603006000020410000376068000412007000090", t: [[3,1],[3,7],[4,1],[4,7]], e: [[4,1,5],[4,1,8]] },
      { p: "000000890060000057070080000920476508740800206000203700000060304406500900008000105", t: [[3,2],[3,7],[4,2],[4,7]], e: [[4,2,1],[4,2,3]] }
    ]
  };

  var curatedExamplePool = {};
  Object.keys(verifiedExampleStates).forEach(function (name) {
    curatedExamplePool[name] = [verifiedExampleStates[name]].concat(curatedExampleAdditions[name] || []);
    curatedExamplePool[name].sort(function (first, second) {
      function complexity(state) {
        var blanks = (state.p.match(/0/g) || []).length;
        var pattern = state.h || state.t || [];
        var patternCandidates = pattern.reduce(function (total, cell) {
          return total + exampleCandidates(state.p, cell[0], cell[1]).length;
        }, 0);
        return (state.complex ? 1000000 : 0) + blanks * 2 + pattern.length * 14 + patternCandidates * 4 + (state.e || []).length * 5;
      }
      return complexity(first) - complexity(second);
    });
  });

  function curatedExampleState(name, variant) {
    var pool = curatedExamplePool[name];
    if (!pool || !pool.length) return null;
    var selectedVariant = variant % pool.length;
    var state = pool[selectedVariant];
    return {
      p: state.p,
      t: state.t,
      h: state.h || state.t,
      e: state.e || [],
      v: state.v,
      d: state.d,
      complex: !!state.complex,
      variant: selectedVariant
    };
  }

  function verifiedExampleFrame(name, state) {
    state = state || curatedExampleState(name, 0);
    if (!state) return null;
    var alternateSingles = {
      "Naked Single": { title: "Only one digit fits", note: "The blue cell has only one legal candidate left. Place that digit there." },
      "Hidden Single": { title: "Find the only possible place", note: "In the highlighted unit, this digit has only one possible home. Place it in the blue cell." }
    };
    var lesson = (state.variant && alternateSingles[name]) || exampleLessons[name] || { title: state.d, note: "Follow the highlighted cells to apply this technique." };
    return {
      title: lesson.title,
      note: lesson.note,
      target: state.v ? state.t : [],
      cause: state.v ? [] : (state.h.length ? state.h : state.t),
      elimination: state.e.map(function (cell) { return [cell[0], cell[1]]; }),
      removed: state.e,
      labels: {},
      puzzle: state.p
    };
  }

  function exampleFocusDigit(state) {
    var removal = (state.e || []).find(function (cell) { return cell.length > 2; });
    if (removal) return String(removal[2]);
    return state.v ? String(state.v) : "the highlighted digit";
  }

  function exampleCellName(cell) {
    return "R" + (cell[0] + 1) + "C" + (cell[1] + 1);
  }

  function exampleCellNames(cells) {
    return cells.map(exampleCellName).join(", ");
  }

  function exampleSameCell(first, second) {
    return first[0] === second[0] && first[1] === second[1];
  }

  function simpleColorGroups(state, digit) {
    var chain = state.h.length ? state.h : state.t;
    var byKey = {};
    var graph = {};
    chain.forEach(function (cell) {
      var key = exampleCellKey(cell[0], cell[1]);
      byKey[key] = cell;
      graph[key] = [];
    });

    function addStrongLink(cells) {
      if (cells.length !== 2) return;
      var firstKey = exampleCellKey(cells[0][0], cells[0][1]);
      var secondKey = exampleCellKey(cells[1][0], cells[1][1]);
      if (!byKey[firstKey] || !byKey[secondKey]) return;
      graph[firstKey].push(secondKey);
      graph[secondKey].push(firstKey);
    }

    for (var unit = 0; unit < 9; unit += 1) {
      var rowCells = [];
      var columnCells = [];
      for (var index = 0; index < 9; index += 1) {
        if (exampleCandidates(state.p, unit, index).indexOf(digit) !== -1) rowCells.push([unit, index]);
        if (exampleCandidates(state.p, index, unit).indexOf(digit) !== -1) columnCells.push([index, unit]);
      }
      addStrongLink(rowCells);
      addStrongLink(columnCells);
      var boxCells = [];
      var boxRow = Math.floor(unit / 3) * 3;
      var boxColumn = (unit % 3) * 3;
      for (var boxIndex = 0; boxIndex < 9; boxIndex += 1) {
        var row = boxRow + Math.floor(boxIndex / 3);
        var column = boxColumn + (boxIndex % 3);
        if (exampleCandidates(state.p, row, column).indexOf(digit) !== -1) boxCells.push([row, column]);
      }
      addStrongLink(boxCells);
    }

    var colors = {};
    var startKey = exampleCellKey(chain[0][0], chain[0][1]);
    colors[startKey] = 0;
    var queue = [startKey];
    for (var queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
      var current = queue[queueIndex];
      graph[current].forEach(function (next) {
        if (colors[next] !== undefined) return;
        colors[next] = 1 - colors[current];
        queue.push(next);
      });
    }

    return {
      a: chain.filter(function (cell, index) {
        var key = exampleCellKey(cell[0], cell[1]);
        return colors[key] === undefined ? index % 2 === 0 : colors[key] === 0;
      }),
      b: chain.filter(function (cell, index) {
        var key = exampleCellKey(cell[0], cell[1]);
        return colors[key] === undefined ? index % 2 === 1 : colors[key] === 1;
      }),
      firstNeighbors: (graph[startKey] || []).map(function (key) { return byKey[key]; })
    };
  }

  function simpleColoringFrames(state) {
    var chain = state.h.length ? state.h : state.t;
    var digit = exampleFocusDigit(state);
    var groups = simpleColorGroups(state, digit);
    var colorA = groups.a;
    var colorB = groups.b;
    var first = colorA[0] || chain[0];
    var neighbors = groups.firstNeighbors.length ? groups.firstNeighbors : colorB.slice(0, 1);
    var removals = state.e.map(function (cell) { return [cell[0], cell[1]]; });
    return [
      {
        title: "Step 1: Find a strong link",
        note: exampleCellName(first) + " is Color A. " + exampleCellNames(neighbors) + " is " + (neighbors.length > 1 ? "are" : "is") + " Color B because each connected pair is a strong link: exactly one cell in the pair must contain " + digit + ".",
        target: [], cause: [], colorA: [first], colorB: neighbors, elimination: [], removed: [], labels: {}, puzzle: state.p
      },
      {
        title: "Step 2: Continue the alternating chain",
        note: "Keep switching color every time the candidate passes through a strong link. The blue cells are one possible truth set; the purple cells are the other. If one blue cell is " + digit + ", every purple cell is not " + digit + ", and vice versa.",
        target: [], cause: [], colorA: colorA, colorB: colorB, elimination: [], removed: [], labels: {}, puzzle: state.p
      },
      {
        title: "Step 3: Remove the candidate that sees both colors",
        note: "Every red cell sees both Color A and Color B. Since one of those colors must contain " + digit + ", the red cell cannot also contain " + digit + ". Remove that pencil mark.",
        target: [], cause: [], colorA: [colorA], colorB: [colorB], elimination: removals, removed: state.e, labels: {}, puzzle: state.p
      }
    ];
  }

  function xyChainFrames(state) {
    var chain = state.h.length ? state.h : state.t;
    var first = chain[0];
    var second = chain[1];
    var last = chain[chain.length - 1];
    var middle = chain.slice(1, -1);
    var digit = exampleFocusDigit(state);
    var removals = state.e.map(function (cell) { return [cell[0], cell[1]]; });
    var firstCandidates = exampleCandidates(state.p, first[0], first[1]);
    var secondCandidates = exampleCandidates(state.p, second[0], second[1]);
    return [
      {
        title: "Step 1: Start with one bivalue link",
        note: exampleCellName(first) + " has candidates {" + firstCandidates.split("").join(", ") + "}. It sees " + exampleCellName(second) + ", which has {" + secondCandidates.split("").join(", ") + "}. Their shared candidate links the two cells.",
        target: [first], cause: [second], elimination: [], removed: [], labels: {}, puzzle: state.p
      },
      {
        title: "Step 2: Follow each shared candidate",
        note: "Each orange cell sees the next one and shares one candidate with it. If a shared candidate is false in one cell, it must be true in the next cell. Follow the highlighted path from " + exampleCellName(first) + " to " + exampleCellName(last) + ".",
        target: [], cause: chain, elimination: [], removed: [], labels: {}, puzzle: state.p
      },
      {
        title: "Step 3: Reach the same digit at both ends",
        note: "Candidate " + digit + " appears at both blue endpoints. Either " + exampleCellName(first) + " is " + digit + ", or assuming it is not " + digit + " forces the chain to end with " + exampleCellName(last) + " = " + digit + ".",
        target: [first, last], cause: middle, elimination: [], removed: [], labels: {}, puzzle: state.p
      },
      {
        title: "Step 4: Remove the candidate that sees both ends",
        note: "Every red cell sees both blue endpoints. One endpoint must be " + digit + ", so the red cell cannot also contain " + digit + ". Remove that pencil mark.",
        target: [first, last], cause: middle, elimination: removals, removed: state.e, labels: {}, puzzle: state.p
      }
    ];
  }

  function verifiedExampleFrames(name, state) {
    state = state || curatedExampleState(name, 0);
    if (name === "Simple Coloring" && state) return simpleColoringFrames(state);
    if (name === "XY-Chain" && state) return xyChainFrames(state);
    var steps = guidedTechniqueSteps[name];
    if (!state || !steps) return null;
    var pattern = state.h.length ? state.h : state.t;
    var digit = exampleFocusDigit(state);
    var hiddenSubset = name === "Hidden Pair" || name === "Hidden Triple" || name === "Hidden Quad";
    var keptCandidates = hiddenSubset ? hiddenSubsetCandidates(state) : [];
    return steps.map(function (step, index) {
      var showEliminations = index === steps.length - 1;
      var note = step.note.replace(/\{digit\}/g, digit);
      if (hiddenSubset) note += index === 0 ? " The blue-underlined pencil marks are the hidden digits to keep." : " Keep the blue-underlined pencil marks; the red struck marks are the extra candidates to remove.";
      return {
        title: step.title,
        note: note,
        target: [],
        cause: pattern,
        elimination: showEliminations ? state.e.map(function (cell) { return [cell[0], cell[1]]; }) : [],
        removed: showEliminations ? state.e : [],
        focus: keptCandidates,
        labels: {},
        puzzle: state.p
      };
    });
  }

  function removedExampleCandidates(frame, row, col) {
    return (frame.removed || []).filter(function (cell) {
      return cell[0] === row && cell[1] === col && cell.length > 2;
    }).map(function (cell) { return String(cell[2]); });
  }

  function hiddenSubsetCandidates(state) {
    var kept = [];
    state.t.forEach(function (cell) {
      var row = cell[0];
      var col = cell[1];
      var removed = (state.e || []).filter(function (entry) {
        return entry[0] === row && entry[1] === col && entry.length > 2;
      }).map(function (entry) { return String(entry[2]); });
      exampleCandidates(state.p, row, col).split("").forEach(function (digit) {
        if (removed.indexOf(digit) === -1) kept.push([row, col, digit]);
      });
    });
    return kept;
  }

  function focusedExampleCandidates(frame, row, col) {
    return (frame.focus || []).filter(function (cell) {
      return cell[0] === row && cell[1] === col && cell.length > 2;
    }).map(function (cell) { return String(cell[2]); });
  }

  function examplePencilMarks(candidates, removed, focused) {
    var marks = [];
    for (var digit = 1; digit <= 9; digit += 1) {
      var value = String(digit);
      var present = candidates.indexOf(value) !== -1;
      marks.push('<span class="sudohint-example-pencil' + (removed.indexOf(value) !== -1 ? ' is-removed' : '') + (focused.indexOf(value) !== -1 ? ' is-focus' : '') + '">' + (present ? value : '') + '</span>');
    }
    return '<span class="sudohint-example-pencil-grid" aria-label="Candidates ' + escapeExampleText(candidates) + '">' + marks.join("") + '</span>';
  }

  function renderExampleFrame(frame, index) {
    var cells = [];
    for (var row = 0; row < 9; row += 1) {
      for (var col = 0; col < 9; col += 1) {
        var key = exampleCellKey(row, col);
        var mark = exampleMark(frame, row, col);
        var label = frame.labels[key] || "";
        var value = frame.puzzle ? frame.puzzle[row * 9 + col] : "0";
        var given = value !== "0";
        var candidates = frame.puzzle && !given ? exampleCandidates(frame.puzzle, row, col) : "";
        var removed = removedExampleCandidates(frame, row, col);
        var focused = focusedExampleCandidates(frame, row, col);
        var context = !label && !mark && !frame.puzzle;
        var candidateMarkup = candidates ? examplePencilMarks(candidates, removed, focused) : "";
        var content = label ? '<span class="sudohint-example-label">' + escapeExampleText(label) + '</span>' :
          (given ? '<span class="sudohint-example-given">' + value + '</span>' :
            (candidates ? candidateMarkup :
              (context ? '<span class="sudohint-example-context" aria-hidden="true">&middot;</span>' : '')));
        cells.push('<div class="sudohint-example-cell box-' + ((Math.floor(row / 3) + Math.floor(col / 3)) % 2 ? "odd" : "even") + ' ' + mark + (context ? ' context' : '') + '">' +
          content +
          '</div>');
      }
    }

    return '<article class="sudohint-example-frame">' +
      '<div class="sudohint-example-frame-head"><strong>' + escapeExampleText(frame.title) + '</strong><span>' + escapeExampleText(frame.note) + '</span></div>' +
      '<div class="sudohint-example-grid" aria-label="Illustration of the technique">' + cells.join("") + '</div>' +
      '</article>';
  }

  function createTechniqueExampleModal() {
    if (document.querySelector("[data-sudohint-example-modal]")) return;

    var modal = document.createElement("div");
    modal.className = "sudohint-example-modal";
    modal.setAttribute("data-sudohint-example-modal", "");
    modal.hidden = true;
    modal.innerHTML = '<div class="sudohint-example-backdrop"></div>' +
      '<section class="sudohint-example-dialog" role="dialog" aria-modal="true" aria-labelledby="sudohint-example-title">' +
      '<div class="sudohint-example-head"><div><p class="sudohint-import-kicker">TECHNIQUE EXAMPLE</p><h2 id="sudohint-example-title"></h2></div><div class="sudohint-example-actions"><span class="sudohint-example-variant" aria-live="polite"></span><button class="sudohint-example-next" type="button">Next example</button><button class="sudohint-example-close" type="button" aria-label="Close example">&times;</button></div></div>' +
      '<p class="sudohint-example-summary"></p><p class="sudohint-example-reading" hidden></p><div class="sudohint-example-frames"></div>' +
      '<div class="sudohint-example-legend"><span><i class="given"></i> Puzzle given</span><span><i class="target"></i> Forced result</span><span><i class="cause"></i> Pattern cells</span><span><i class="elimination"></i> Candidate removed</span></div>' +
      '</section>';
    document.body.appendChild(modal);

    var title = modal.querySelector("#sudohint-example-title");
    var summary = modal.querySelector(".sudohint-example-summary");
    var reading = modal.querySelector(".sudohint-example-reading");
    var frames = modal.querySelector(".sudohint-example-frames");
    var legend = modal.querySelector(".sudohint-example-legend");
    var variantLabel = modal.querySelector(".sudohint-example-variant");
    var next = modal.querySelector(".sudohint-example-next");
    var dialog = modal.querySelector(".sudohint-example-dialog");

    function close() {
      modal.hidden = true;
    }

    function render(name, variant) {
      var example = techniqueExamples[name];
      if (!example) return;
      var state = curatedExampleState(name, variant);
      var count = state && curatedExamplePool[name] ? curatedExamplePool[name].length : 1;
      var selectedVariant = state ? state.variant : 0;
      var level = curatedExampleLevels[selectedVariant] || "Example";
      title.textContent = name;
      summary.textContent = example.summary;
      variantLabel.textContent = count > 1
        ? (level + " example" + (state && state.complex ? " · Complex chain" : "") + " · " + (selectedVariant + 1) + " of " + count)
        : "";
      next.hidden = count < 2;
      var verifiedFrames = verifiedExampleFrames(name, state);
      var verifiedFrame = verifiedExampleFrame(name, state);
      reading.hidden = !verifiedFrames;
      reading.textContent = verifiedFrames ? (level === "Easy" ? "Easy example: the pattern is compact, so focus on the key relationship first." : level === "Medium" ? "Medium example: the same logic is present in a busier position. Follow each card in order." : "Hard example: the pattern is more spread out or has more competing candidates. Work through each card one step at a time.") : "";
      frames.innerHTML = (verifiedFrames || (verifiedFrame ? [verifiedFrame] : example.frames)).map(renderExampleFrame).join("");
      legend.innerHTML = name === "Simple Coloring"
        ? '<span><i class="given"></i> Puzzle given</span><span><i class="color-a"></i> Color A</span><span><i class="color-b"></i> Color B</span><span><i class="elimination"></i> Candidate removed</span>'
        : (name === "Hidden Pair" || name === "Hidden Triple" || name === "Hidden Quad")
          ? '<span><i class="given"></i> Puzzle given</span><span><i class="focus"></i> Digits to keep</span><span><i class="cause"></i> Pattern cells</span><span><i class="elimination"></i> Candidate removed</span>'
          : '<span><i class="given"></i> Puzzle given</span><span><i class="target"></i> Forced result</span><span><i class="cause"></i> Pattern cells</span><span><i class="elimination"></i> Candidate removed</span>';
      modal.currentExample = name;
      modal.currentVariant = selectedVariant;
      dialog.scrollTop = 0;
    }

    function open(name) {
      render(name, 0);
      modal.hidden = false;
      modal.querySelector(".sudohint-example-close").focus();
    }

    next.addEventListener("click", function () {
      if (!modal.currentExample) return;
      var count = curatedExamplePool[modal.currentExample] ? curatedExamplePool[modal.currentExample].length : 1;
      render(modal.currentExample, (modal.currentVariant + 1) % count);
    });
    modal.querySelector(".sudohint-example-close").addEventListener("click", close);
    modal.querySelector(".sudohint-example-backdrop").addEventListener("click", close);
    document.addEventListener("keydown", function (event) {
      if (!modal.hidden && event.key === "Escape") close();
    });
    modal.openExample = open;
  }

  function enhanceTechniqueList() {
    var list = document.querySelector(".technique-list");
    if (!list) return;
    createTechniqueExampleModal();

    var section = list.closest(".technique-ref");
    if (section && !section.querySelector(".sudohint-technique-legend")) {
      var legend = document.createElement("div");
      legend.className = "sudohint-technique-legend";
      legend.setAttribute("aria-label", "Technique difficulty levels");
      legend.innerHTML =
        '<span class="basic"><i></i>Basic</span>' +
        '<span class="intermediate"><i></i>Intermediate</span>' +
        '<span class="advanced"><i></i>Advanced</span>' +
        '<span class="expert"><i></i>Expert</span>';
      list.parentNode.insertBefore(legend, list);
    }

    Array.prototype.forEach.call(list.querySelectorAll(".ref-item"), function (item) {
      if (item.querySelector(".technique-example-trigger")) return;
      var nameElement = item.querySelector(".ref-name");
      if (!nameElement || !techniqueExamples[nameElement.textContent]) return;
      var button = document.createElement("button");
      button.className = "technique-example-trigger";
      button.type = "button";
      button.textContent = "Example";
      button.setAttribute("aria-label", "View example for " + nameElement.textContent);
      button.addEventListener("click", function () {
        var modal = document.querySelector("[data-sudohint-example-modal]");
        if (modal && modal.openExample) modal.openExample(nameElement.textContent);
      });
      item.querySelector(".ref-item-header").appendChild(button);
    });
  }

  function imageToneLimits(data) {
    var histogram = new Uint32Array(256);
    var pixels = data.length / 4;
    for (var index = 0; index < data.length; index += 4) {
      var tone = Math.round(data[index] * 0.2126 + data[index + 1] * 0.7152 + data[index + 2] * 0.0722);
      histogram[tone] += 1;
    }

    function quantile(amount) {
      var target = pixels * amount;
      var total = 0;
      for (var tone = 0; tone < 256; tone += 1) {
        total += histogram[tone];
        if (total >= target) return tone;
      }
      return 128;
    }

    // Dark-mode screenshots often use medium-gray inner grid lines.  A bright
    // floor of 120 catches only the outer box lines, so keep this low enough
    // to retain the thin lines while the 10-line spacing check rejects text.
    return { dark: Math.min(155, Math.max(45, quantile(0.22))), bright: Math.max(70, Math.min(220, quantile(0.84))) };
  }

  function lineBands(projection, minimum) {
    var bands = [];
    for (var index = 0; index < projection.length;) {
      if (projection[index] < minimum) {
        index += 1;
        continue;
      }
      var start = index;
      var weight = 0;
      var center = 0;
      while (index < projection.length && projection[index] >= minimum) {
        weight += projection[index];
        center += index * projection[index];
        index += 1;
      }
      bands.push({ start: start, end: index - 1, center: center / Math.max(1, weight) });
    }
    return bands;
  }

  function findNineSpaces(bands) {
    var best = null;
    for (var first = 0; first < bands.length - 9; first += 1) {
      for (var last = first + 9; last < bands.length; last += 1) {
        var step = (bands[last].center - bands[first].center) / 9;
        if (step < 12) continue;
        var selected = [bands[first]];
        var error = 0;
        var valid = true;
        for (var line = 1; line < 9; line += 1) {
          var expected = bands[first].center + step * line;
          var closest = null;
          var distance = Infinity;
          for (var candidate = first + 1; candidate < last; candidate += 1) {
            var difference = Math.abs(bands[candidate].center - expected);
            if (difference < distance) {
              closest = bands[candidate];
              distance = difference;
            }
          }
          if (!closest || distance > step * 0.18) {
            valid = false;
            break;
          }
          selected.push(closest);
          error += distance / step;
        }
        if (!valid) continue;
        selected.push(bands[last]);
        if (!best || error < best.error) best = { lines: selected, error: error, start: bands[first].center, end: bands[last].center };
      }
    }
    return best;
  }

  function gridCandidate(imageData, width, height, limit, isBright) {
    var vertical = new Uint32Array(width);
    var horizontal = new Uint32Array(height);
    var data = imageData.data;
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var pixel = (y * width + x) * 4;
        var tone = data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722;
        if (isBright ? tone >= limit : tone <= limit) {
          vertical[x] += 1;
          horizontal[y] += 1;
        }
      }
    }
    var columns = findNineSpaces(lineBands(vertical, Math.max(10, height * 0.16)));
    var rows = findNineSpaces(lineBands(horizontal, Math.max(10, width * 0.16)));
    if (!columns || !rows) return null;
    var boardWidth = columns.end - columns.start;
    var boardHeight = rows.end - rows.start;
    var aspectPenalty = Math.abs(Math.log(boardWidth / boardHeight));
    return {
      left: columns.start,
      top: rows.start,
      right: columns.end,
      bottom: rows.end,
      score: columns.error + rows.error + aspectPenalty * 5,
      confidence: Math.max(0, Math.min(0.99, 0.96 - (columns.error + rows.error) * 0.06 - aspectPenalty * 0.45))
    };
  }

  function edgeGridCandidate(imageData, width, height) {
    var tones = new Uint8Array(width * height);
    var data = imageData.data;
    for (var pixel = 0, toneIndex = 0; pixel < data.length; pixel += 4, toneIndex += 1) {
      tones[toneIndex] = Math.round(data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722);
    }

    var vertical = new Uint32Array(width);
    var horizontal = new Uint32Array(height);
    for (var y = 1; y < height - 1; y += 1) {
      var row = y * width;
      for (var x = 1; x < width - 1; x += 1) {
        vertical[x] += Math.abs(tones[row + x + 1] - tones[row + x - 1]);
        horizontal[y] += Math.abs(tones[row + width + x] - tones[row - width + x]);
      }
    }

    var columns = findNineSpaces(lineBands(vertical, Math.max(80, height * 2.4)));
    var rows = findNineSpaces(lineBands(horizontal, Math.max(80, width * 2.4)));
    if (!columns || !rows) return null;
    var boardWidth = columns.end - columns.start;
    var boardHeight = rows.end - rows.start;
    var aspectPenalty = Math.abs(Math.log(boardWidth / boardHeight));
    return {
      left: columns.start,
      top: rows.start,
      right: columns.end,
      bottom: rows.end,
      score: columns.error + rows.error + aspectPenalty * 5,
      confidence: Math.max(0, Math.min(0.94, 0.9 - (columns.error + rows.error) * 0.05 - aspectPenalty * 0.4))
    };
  }

  function majorLinePairs(bands, dimension) {
    var pairs = [];
    for (var first = 0; first < bands.length - 1; first += 1) {
      for (var second = first + 1; second < bands.length; second += 1) {
        var spacing = bands[second].center - bands[first].center;
        var start = bands[first].center - spacing;
        var end = bands[second].center + spacing;
        var size = end - start;
        if (spacing < 24 || size < dimension * 0.28 || start < 0 || end > dimension) continue;
        pairs.push({ start: start, end: end, size: size });
      }
    }
    return pairs;
  }

  function majorGridCandidate(imageData, width, height, limit, isBright) {
    var vertical = new Uint32Array(width);
    var horizontal = new Uint32Array(height);
    var data = imageData.data;
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var pixel = (y * width + x) * 4;
        var tone = data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722;
        if (isBright ? tone >= limit : tone <= limit) {
          vertical[x] += 1;
          horizontal[y] += 1;
        }
      }
    }
    var columnPairs = majorLinePairs(lineBands(vertical, Math.max(10, height * 0.12)), width);
    var rowPairs = majorLinePairs(lineBands(horizontal, Math.max(10, width * 0.12)), height);
    var best = null;
    for (var column = 0; column < columnPairs.length; column += 1) {
      for (var row = 0; row < rowPairs.length; row += 1) {
        var aspectPenalty = Math.abs(Math.log(columnPairs[column].size / rowPairs[row].size));
        if (!best || aspectPenalty < best.score) {
          best = {
            left: columnPairs[column].start,
            top: rowPairs[row].start,
            right: columnPairs[column].end,
            bottom: rowPairs[row].end,
            score: aspectPenalty,
            confidence: Math.max(0.45, Math.min(0.78, 0.74 - aspectPenalty * 0.35))
          };
        }
      }
    }
    return best;
  }

  function detectSudokuGrid(image) {
    var maximum = 1000;
    var scale = Math.min(1, maximum / Math.max(image.naturalWidth, image.naturalHeight));
    var width = Math.max(1, Math.round(image.naturalWidth * scale));
    var height = Math.max(1, Math.round(image.naturalHeight * scale));
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, width, height);
    var imageData = context.getImageData(0, 0, width, height);
    var limits = imageToneLimits(imageData.data);
    var dark = gridCandidate(imageData, width, height, limits.dark, false);
    var bright = gridCandidate(imageData, width, height, limits.bright, true);
    var result = !dark ? bright : !bright ? dark : (dark.score <= bright.score ? dark : bright);
    if (!result) {
      var brightMajor = majorGridCandidate(imageData, width, height, limits.bright, true);
      var darkMajor = majorGridCandidate(imageData, width, height, limits.dark, false);
      result = !brightMajor ? darkMajor : !darkMajor ? brightMajor : (brightMajor.score <= darkMajor.score ? brightMajor : darkMajor);
    }
    if (!result) result = edgeGridCandidate(imageData, width, height);
    return { canvas: canvas, grid: result };
  }

  function drawGridPreview(target, source, grid) {
    target.width = source.width;
    target.height = source.height;
    var context = target.getContext("2d");
    context.drawImage(source, 0, 0);
    if (!grid) return;
    var points = grid.points || [
      { x: grid.left, y: grid.top },
      { x: grid.right, y: grid.top },
      { x: grid.right, y: grid.bottom },
      { x: grid.left, y: grid.bottom }
    ];
    context.save();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var point = 1; point < points.length; point += 1) context.lineTo(points[point].x, points[point].y);
    context.closePath();
    context.fillStyle = "rgba(37, 99, 235, 0.13)";
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

  var openCvPromise;

  function loadOpenCv() {
    if (window.cv && window.cv.Mat) return Promise.resolve(window.cv);
    if (openCvPromise) return openCvPromise;
    openCvPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      var deadline = Date.now() + 20000;
      function waitForRuntime() {
        if (window.cv && window.cv.Mat) {
          resolve(window.cv);
        } else if (Date.now() > deadline) {
          reject(new Error("The local geometry library did not finish loading."));
        } else {
          window.setTimeout(waitForRuntime, 80);
        }
      }
      script.async = true;
      script.src = "https://docs.opencv.org/4.x/opencv.js";
      script.onload = waitForRuntime;
      script.onerror = function () { reject(new Error("The local geometry library could not be downloaded.")); };
      document.head.appendChild(script);
    });
    return openCvPromise;
  }

  function orderGridCorners(points) {
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

  function contourGridCandidate(cv, binary, imageArea) {
    var contours = new cv.MatVector();
    var hierarchy = new cv.Mat();
    var best = null;
    try {
      cv.findContours(binary, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
      for (var index = 0; index < contours.size(); index += 1) {
        var contour = contours.get(index);
        var perimeter = cv.arcLength(contour, true);
        var approximation = new cv.Mat();
        cv.approxPolyDP(contour, approximation, perimeter * 0.025, true);
        var area = Math.abs(cv.contourArea(contour));
        if (approximation.rows === 4 && cv.isContourConvex(approximation) && area > imageArea * 0.045) {
          var values = approximation.data32S;
          var corners = [];
          for (var point = 0; point < 4; point += 1) corners.push({ x: values[point * 2], y: values[point * 2 + 1] });
          corners = orderGridCorners(corners);
          var width = (Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y) + Math.hypot(corners[2].x - corners[3].x, corners[2].y - corners[3].y)) / 2;
          var height = (Math.hypot(corners[3].x - corners[0].x, corners[3].y - corners[0].y) + Math.hypot(corners[2].x - corners[1].x, corners[2].y - corners[1].y)) / 2;
          var aspectPenalty = Math.abs(Math.log(width / height));
          var score = area * Math.max(0.2, 1 - aspectPenalty);
          if (width > 60 && height > 60 && (!best || score > best.score)) {
            best = { points: corners, score: score, confidence: Math.max(0.55, Math.min(0.95, 0.62 + area / imageArea * 0.3 - aspectPenalty * 0.25)) };
          }
        }
        approximation.delete();
        contour.delete();
      }
    } finally {
      contours.delete();
      hierarchy.delete();
    }
    return best;
  }

  function detectGridWithContours(sourceCanvas) {
    return loadOpenCv().then(function (cv) {
      var source = cv.imread(sourceCanvas);
      var gray = new cv.Mat();
      var blurred = new cv.Mat();
      var edges = new cv.Mat();
      var threshold = new cv.Mat();
      var kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
      try {
        cv.cvtColor(source, gray, cv.COLOR_RGBA2GRAY);
        cv.medianBlur(gray, blurred, 3);
        cv.Canny(blurred, edges, 35, 120);
        cv.dilate(edges, edges, kernel);
        var edgeCandidate = contourGridCandidate(cv, edges, source.rows * source.cols);
        cv.adaptiveThreshold(blurred, threshold, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 31, 5);
        cv.morphologyEx(threshold, threshold, cv.MORPH_CLOSE, kernel);
        var thresholdCandidate = contourGridCandidate(cv, threshold, source.rows * source.cols);
        if (!edgeCandidate) return thresholdCandidate;
        if (!thresholdCandidate) return edgeCandidate;
        return edgeCandidate.score >= thresholdCandidate.score ? edgeCandidate : thresholdCandidate;
      } finally {
        source.delete();
        gray.delete();
        blurred.delete();
        edges.delete();
        threshold.delete();
        kernel.delete();
      }
    });
  }

  function createImportUi() {
    if (document.querySelector("[data-sudohint-import]")) return;

    var widget = document.createElement("div");
    widget.className = "sudohint-import";
    widget.setAttribute("data-sudohint-import", "");
    widget.innerHTML = [
      '<button class="sudohint-import-fab" type="button" aria-haspopup="dialog" aria-expanded="false">',
      '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">',
      '    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>',
      '    <polyline points="17 8 12 3 7 8"></polyline>',
      '    <line x1="12" y1="3" x2="12" y2="15"></line>',
      '  </svg>',
      '  <span>Enter a puzzle</span>',
      '</button>',
      '<div class="sudohint-import-backdrop" hidden></div>',
      '<section class="sudohint-import-dialog" role="dialog" aria-modal="true" aria-labelledby="sudohint-import-title" hidden>',
      '  <div class="sudohint-import-head">',
      '    <div><p class="sudohint-import-kicker">START HERE</p><h2 id="sudohint-import-title">Enter a puzzle</h2></div>',
      '    <button class="sudohint-import-close" type="button" aria-label="Close">&times;</button>',
      '  </div>',
      '  <p class="sudohint-import-help">Fill the cells below, or paste a puzzle from another app. Use 0, dots, or blanks for empty cells.</p>',
      '  <div class="sudohint-editor-grid" role="group" aria-label="Puzzle editor"></div>',
      '  <div class="sudohint-import-divider"><span>or paste a puzzle</span></div>',
      '  <label class="sudohint-import-label" for="sudohint-import-text">Paste grid or 81-character string</label>',
      '  <textarea id="sudohint-import-text" class="sudohint-import-text" rows="3" spellcheck="false"></textarea>',
      '  <details class="sudohint-image-import">',
      '    <summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V3m0 0-4.5 4.5M12 3l4.5 4.5M5 14.5v4A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5v-4"/></svg><span>Add a screenshot of your grid</span></summary>',
      '    <p>Choose or paste a screenshot or a straight-on photo. Detection and reading happen only in your browser.</p>',
      '    <div class="sudohint-image-actions">',
      '      <label class="sudohint-image-select">Choose image<input class="sudohint-image-input" type="file" accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,image/png,image/jpeg,image/webp,image/gif,image/bmp" capture="environment"></label>',
      '      <button class="sudohint-image-select sudohint-image-paste" type="button">Paste from clipboard</button>',
      '    </div>',
      '    <p>Supports PNG, JPG/JPEG, WebP, GIF, and BMP. You can also press Ctrl+V (Cmd+V on Mac) anywhere in this dialog to paste an image.</p>',
      '    <div class="sudohint-image-preview" hidden><canvas class="sudohint-image-canvas"></canvas></div>',
      '    <div class="sudohint-straightened-preview" hidden>',
      '      <p><strong>Board straightened</strong> &middot; 81 cells ready for digit reading</p>',
      '      <canvas class="sudohint-straightened-canvas"></canvas>',
      '    </div>',
      '    <div class="sudohint-digit-review" hidden>',
      '      <div class="sudohint-digit-review-head"><div><strong>Review recognized digits</strong><p class="sudohint-digit-review-help">Reading the large digits in your browser…</p></div></div>',
      '      <p class="sudohint-digit-review-summary" hidden></p>',
      '      <div class="sudohint-digit-review-grid" role="group" aria-label="Recognized Sudoku digits" hidden></div>',
      '      <div class="sudohint-digit-review-actions" hidden><button class="sudohint-use-recognized" type="button">Use in puzzle editor</button></div>',
      '    </div>',
      '    <p class="sudohint-image-status" role="status" aria-live="polite"></p>',
      '  </details>',
      '  <div class="sudohint-image-divider sudohint-import-divider"><span>or fill the cells below</span></div>',
      '  <div class="sudohint-import-actions">',
      '    <button class="sudohint-import-quiet" type="button">Clear</button>',
      '    <button class="sudohint-import-primary" type="button">Load & Hint</button>',
      '  </div>',
      '  <p class="sudohint-import-status" role="status" aria-live="polite"></p>',
      '</section>'
    ].join("");

    document.body.appendChild(widget);

    var fab = widget.querySelector(".sudohint-import-fab");
    var backdrop = widget.querySelector(".sudohint-import-backdrop");
    var dialog = widget.querySelector(".sudohint-import-dialog");
    var textarea = widget.querySelector(".sudohint-import-text");
    var editor = widget.querySelector(".sudohint-editor-grid");
    var status = widget.querySelector(".sudohint-import-status");
    var closeButton = widget.querySelector(".sudohint-import-close");
    var clearButton = widget.querySelector(".sudohint-import-quiet");
    var loadButton = widget.querySelector(".sudohint-import-primary");
    var imageInput = widget.querySelector(".sudohint-image-input");
    var imageImport = widget.querySelector(".sudohint-image-import");
    var imagePasteButton = widget.querySelector(".sudohint-image-paste");
    var imagePreview = widget.querySelector(".sudohint-image-preview");
    var imageCanvas = widget.querySelector(".sudohint-image-canvas");
    var straightenedPreview = widget.querySelector(".sudohint-straightened-preview");
    var straightenedCanvas = widget.querySelector(".sudohint-straightened-canvas");
    var digitReview = widget.querySelector(".sudohint-digit-review");
    var digitReviewSummary = widget.querySelector(".sudohint-digit-review-summary");
    var digitReviewGrid = widget.querySelector(".sudohint-digit-review-grid");
    var digitReviewActions = widget.querySelector(".sudohint-digit-review-actions");
    var useRecognizedButton = widget.querySelector(".sudohint-use-recognized");
    var imageStatus = widget.querySelector(".sudohint-image-status");
    var imageDetectionId = 0;
    var detectedBoard = null;
    var detectedAnalysis = null;

    for (var cell = 0; cell < 81; cell += 1) {
      var input = document.createElement("input");
      input.className = "sudohint-editor-cell";
      input.type = "text";
      input.inputMode = "numeric";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.setAttribute("aria-label", "Row " + (Math.floor(cell / 9) + 1) + ", column " + (cell % 9 + 1));
      input.dataset.index = String(cell);
      editor.appendChild(input);
    }

    var editorInputs = editor.querySelectorAll(".sudohint-editor-cell");

    textarea.placeholder = samplePuzzle;

    function setOpen(open) {
      backdrop.hidden = !open;
      dialog.hidden = !open;
      fab.setAttribute("aria-expanded", String(open));
      if (open) {
        setEditorStatus("", false);
        window.setTimeout(function () {
          textarea.focus();
        }, 0);
      } else {
        fab.focus();
      }
    }

    function setEditorStatus(message, isError) {
      status.textContent = message || "";
      status.classList.toggle("is-error", Boolean(isError));
    }

    function setImageStatus(message, isError) {
      imageStatus.textContent = message || "";
      imageStatus.classList.toggle("is-error", Boolean(isError));
    }

    function showDigitReview(analysis) {
      digitReview.hidden = false;
      digitReviewSummary.hidden = true;
      digitReviewGrid.hidden = true;
      digitReviewGrid.innerHTML = "";
      digitReviewActions.hidden = true;
      digitReview.dataset.ready = "";
      var count = analysis.counts.digit;
      digitReview.querySelector(".sudohint-digit-review-help").textContent = "Reading " + count + " large digits locally. Pencil marks are left blank.";
    }

    function renderDigitReview(result) {
      digitReviewSummary.textContent = result.counts.read + " of " + (result.counts.read + result.counts.missed) + " likely full digits were read. Review any amber cells, then use the values in the puzzle editor.";
      digitReviewSummary.hidden = false;
      digitReviewGrid.innerHTML = "";
      result.cells.forEach(function (cell, index) {
        var input = document.createElement("input");
        var uncertain = cell.kind === "digit" && (!cell.value || cell.confidence < 70);
        input.className = "sudohint-digit-review-cell is-" + cell.kind + (uncertain ? " is-uncertain" : "");
        input.type = "text";
        input.inputMode = "numeric";
        input.maxLength = 1;
        input.autocomplete = "off";
        input.value = cell.value || "";
        input.dataset.index = String(index);
        input.setAttribute("aria-label", "Review row " + (cell.row + 1) + ", column " + (cell.column + 1));
        if (cell.kind !== "digit") input.setAttribute("title", cell.kind === "pencil" ? "Pencil marks: intentionally left blank" : "Empty cell");
        else input.setAttribute("title", cell.value ? "Read " + cell.value + " (confidence " + Math.round(cell.confidence || 0) + "%)" : "No digit was read; check this cell");
        input.addEventListener("input", function () {
          input.value = input.value.replace(/[^1-9]/g, "").slice(-1);
          input.classList.remove("is-uncertain");
        });
        digitReviewGrid.appendChild(input);
      });
      digitReviewGrid.hidden = false;
      digitReviewActions.hidden = false;
      digitReview.dataset.ready = "true";
    }

    function copyRecognizedDigits() {
      var reviewInputs = digitReviewGrid.querySelectorAll(".sudohint-digit-review-cell");
      if (!reviewInputs.length) return;
      var text = Array.prototype.map.call(reviewInputs, function (input) { return input.value || "."; }).join("");
      fillEditor(editorInputs, text);
      syncEditorToText();
      setEditorStatus("Recognized digits are in the editor. Check or correct them, then choose Load & Hint.", false);
      editor.scrollIntoView({ block: "center", behavior: "smooth" });
      editorInputs[0].focus();
    }

    function readDetectedDigits() {
      if (!detectedBoard || !detectedAnalysis) return;
      if (!window.SudokuDigitRecognizer) {
        setImageStatus("The local digit reader did not load. Refresh the page and try again.", true);
        return;
      }
      var detectionId = imageDetectionId;
      setImageStatus("Loading the local digit reader. The first use may take a moment.", false);
      window.SudokuDigitRecognizer.recognize(detectedBoard, detectedAnalysis, function (progress) {
        if (detectionId !== imageDetectionId) return;
        if (progress.phase === "Reading digits") {
          digitReview.querySelector(".sudohint-digit-review-help").textContent = "Reading large digits locally: " + progress.loaded + " of " + progress.total + ".";
          setImageStatus("Reading large digits locally: " + progress.loaded + " of " + progress.total + ".", false);
        }
      }).then(function (result) {
        if (detectionId !== imageDetectionId) return;
        renderDigitReview(result);
        setImageStatus("Digits read locally. Review the 9 × 9 grid, then copy the values into the puzzle editor.", false);
      }).catch(function () {
        if (detectionId !== imageDetectionId) return;
        digitReview.querySelector(".sudohint-digit-review-help").textContent = "The digit reader could not start. Choose another image and try again.";
        setImageStatus("The local digit reader could not start. Check your connection once, then try again.", true);
      });
    }

    var supportedImageTypes = {
      "image/png": ["png"],
      "image/jpeg": ["jpg", "jpeg"],
      "image/webp": ["webp"],
      "image/gif": ["gif"],
      "image/bmp": ["bmp"]
    };
    var supportedImageMessage = "Please choose or paste a supported image: PNG, JPG/JPEG, WebP, GIF, or BMP.";

    function isSupportedImage(file) {
      var type = (file.type || "").toLowerCase();
      var extension = file.name && file.name.toLowerCase().match(/\.([^.]+)$/);
      if (file.name && !extension) return false;
      if (type && !Object.prototype.hasOwnProperty.call(supportedImageTypes, type)) return false;
      if (extension) {
        var extensions = type ? supportedImageTypes[type] : ["png", "jpg", "jpeg", "webp", "gif", "bmp"];
        return extensions.indexOf(extension[1]) !== -1;
      }
      return Boolean(type);
    }

    async function pasteClipboardImage() {
      imageImport.open = true;
      if (!navigator.clipboard || typeof navigator.clipboard.read !== "function" || !window.isSecureContext) {
        setImageStatus("Use Ctrl+V (Cmd+V on Mac) in this dialog to paste an image, or choose an image file.", true);
        return;
      }
      imagePasteButton.disabled = true;
      try {
        var items = await navigator.clipboard.read();
        for (var i = 0; i < items.length; i += 1) {
          var type = items[i].types.find(function (type) {
            return Object.prototype.hasOwnProperty.call(supportedImageTypes, type);
          });
          if (type) {
            detectSelectedImage(await items[i].getType(type));
            return;
          }
        }
        setImageStatus(supportedImageMessage, true);
      } catch (error) {
        setImageStatus("Clipboard access was unavailable. Use Ctrl+V (Cmd+V on Mac) in this dialog, or choose an image file.", true);
      } finally {
        imagePasteButton.disabled = false;
      }
    }

    function detectSelectedImage(file) {
      if (!file) return;
      imageImport.open = true;
      if (!isSupportedImage(file)) {
        setImageStatus(supportedImageMessage, true);
        return;
      }
      setImageStatus("Detecting grid locally...", false);
      imagePreview.hidden = true;
      straightenedPreview.hidden = true;
      digitReview.hidden = true;
      detectedBoard = null;
      detectedAnalysis = null;
      var detectionId = imageDetectionId + 1;
      imageDetectionId = detectionId;
      var objectUrl = URL.createObjectURL(file);
      var image = new Image();
      image.onload = function () {
        URL.revokeObjectURL(objectUrl);
        if (detectionId !== imageDetectionId) return;
        if (!window.SudokuGridDetector) {
          setImageStatus("The image detector did not load. Refresh the page and try again.", true);
          return;
        }
        setImageStatus("Finding and checking Sudoku grid lines locally...", false);
        window.SudokuGridDetector.detect(image).then(function (result) {
          if (detectionId !== imageDetectionId) return;
          window.SudokuGridDetector.drawPreview(imageCanvas, result.canvas, result.grid);
          imagePreview.hidden = false;
          if (result.grid) {
            setImageStatus("Straightening the detected board and splitting it into 81 cells...", false);
            window.SudokuGridDetector.straightenGrid(result.canvas, result.grid).then(function (board) {
              if (detectionId !== imageDetectionId) return;
              detectedBoard = board;
              straightenedCanvas.width = board.canvas.width;
              straightenedCanvas.height = board.canvas.height;
              straightenedCanvas.getContext("2d").drawImage(board.canvas, 0, 0);
              straightenedPreview.hidden = false;
              setImageStatus("Checking each cell for full digits and pencil marks...", false);
              return window.SudokuGridDetector.analyzeCells(board);
            }).then(function (analysis) {
              if (detectionId !== imageDetectionId || !analysis) return;
              detectedAnalysis = analysis;
              showDigitReview(analysis);
              setImageStatus("Board straightened. Reading the large digits locally…", false);
              readDetectedDigits();
            }).catch(function () {
              if (detectionId !== imageDetectionId) return;
              setImageStatus("Grid found, but the board could not be straightened. Try a clearer image.", true);
            });
          } else {
            setImageStatus("No reliable Sudoku board was found. Try cropping closer to the board or using a clearer photo.", true);
          }
        }).catch(function () {
          if (detectionId !== imageDetectionId) return;
          imagePreview.hidden = true;
          setImageStatus("The local geometry detector could not run. Check your connection once, then try the image again.", true);
        });
      };
      image.onerror = function () {
        URL.revokeObjectURL(objectUrl);
        if (detectionId !== imageDetectionId) return;
        setImageStatus("Could not open this image. Try a PNG or JPEG screenshot.", true);
      };
      image.src = objectUrl;
    }

    function syncEditorToText() {
      textarea.value = gridToText(editorInputs);
    }

    function syncTextToEditor() {
      var compact = textarea.value.replace(/[^1-9\.\-_0]/g, "");
      if (compact.length === 81) {
        fillEditor(editorInputs, compact);
        setEditorStatus("Grid updated. Check it, then load your hint.", false);
      } else if (compact.length > 0) {
        setEditorStatus("Keep going - this paste has " + compact.length + " of 81 cells.", false);
      }
    }

    function loadPuzzle() {
      setEditorStatus("", false);

      try {
        var pastedCells = textarea.value.replace(/[^1-9\.\-_0]/g, "");
        if (pastedCells.length > 0 && pastedCells.length !== 81) {
          throw new Error("This paste has " + pastedCells.length + " of 81 cells.");
        }
        if (pastedCells.length === 81) syncTextToEditor();
        else syncEditorToText();
        var parsed = parsePuzzle(textarea.value);
        var api = window.SudoHint;
        if (!api || typeof api.loadPuzzle !== "function") {
          throw new Error("The Sudoku engine is still loading.");
        }

        var hint = api.loadPuzzle(parsed.grid);
        setOpen(false);
        if (!hint || hint.unsupported) {
          showToast("Loaded puzzle. No supported next hint was found.");
        } else if (parsed.solutionCount > 1) {
          showToast("Loaded puzzle. Multiple solutions exist; showing a logical hint.");
        } else {
          showToast("Loaded puzzle. Showing the next hint.");
        }
      } catch (error) {
        setEditorStatus(error.message, true);
      }
    }

    fab.addEventListener("click", function () { setOpen(true); });
    closeButton.addEventListener("click", function () { setOpen(false); });
    backdrop.addEventListener("click", function () { setOpen(false); });
    clearButton.addEventListener("click", function () {
      fillEditor(editorInputs, "");
      textarea.value = "";
      setEditorStatus("", false);
      editorInputs[0].focus();
    });
    imageInput.addEventListener("change", function () {
      detectSelectedImage(imageInput.files && imageInput.files[0]);
      imageInput.value = "";
    });
    imagePasteButton.addEventListener("click", pasteClipboardImage);
    dialog.addEventListener("paste", function (event) {
      var clipboard = event.clipboardData;
      if (!clipboard) return;
      var files = Array.prototype.slice.call(clipboard.files || []);
      if (!files.length) {
        Array.prototype.forEach.call(clipboard.items || [], function (item) {
          if (item.kind === "file") {
            var file = item.getAsFile();
            if (file) files.push(file);
          }
        });
      }
      if (files.length) {
        event.preventDefault();
        event.stopPropagation();
        var supportedFile = files.find(isSupportedImage);
        detectSelectedImage(supportedFile || files[0]);
      } else if (imageImport.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        setImageStatus(supportedImageMessage, true);
      }
    }, true);
    useRecognizedButton.addEventListener("click", copyRecognizedDigits);
    loadButton.addEventListener("click", loadPuzzle);
    textarea.addEventListener("input", syncTextToEditor);
    Array.prototype.forEach.call(editorInputs, function (input, index) {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/[^1-9]/g, "").slice(-1);
        syncEditorToText();
        setEditorStatus("", false);
        if (input.value && index < 80) editorInputs[index + 1].focus();
      });
      input.addEventListener("keydown", function (event) {
        var target = index;
        if (event.key === "Delete") {
          event.preventDefault();
          input.value = "";
          syncEditorToText();
          setEditorStatus("", false);
          return;
        }
        if (event.key === "Backspace") {
          event.preventDefault();
          if (input.value) {
            input.value = "";
          } else if (index > 0) {
            target = index - 1;
            editorInputs[target].focus();
            editorInputs[target].value = "";
          }
          syncEditorToText();
          setEditorStatus("", false);
          return;
        }
        if (event.key === "ArrowLeft" && index > 0) target = index - 1;
        if (event.key === "ArrowRight" && index < 80) target = index + 1;
        if (event.key === "ArrowUp" && index > 8) target = index - 9;
        if (event.key === "ArrowDown" && index < 72) target = index + 9;
        if (target !== index) {
          event.preventDefault();
          editorInputs[target].focus();
        }
      });
      input.addEventListener("paste", function (event) {
        var pasted = (event.clipboardData || window.clipboardData).getData("text");
        if (pasted.length > 1) {
          event.preventDefault();
          textarea.value = pasted;
          syncTextToEditor();
        }
      });
    });
    textarea.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        loadPuzzle();
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  function enhanceHintKey() {
    var panel = document.querySelector(".hint-panel");
    if (!panel) return;
    var legend = panel.querySelector(".hint-legend");
    if (!legend) return;

    if (!panel.querySelector(".sudohint-hint-key-title")) {
      var title = document.createElement("p");
      title.className = "sudohint-hint-key-title";
      title.textContent = "HOW TO READ THIS HINT";
      legend.parentNode.insertBefore(title, legend);
    }

    if (!legend.querySelector(".given-dot")) {
      var given = document.createElement("div");
      given.className = "legend-item sudohint-given-key";
      given.innerHTML = '<span class="legend-dot given-dot"></span><span>Given number</span>';
      legend.insertBefore(given, legend.firstChild);
    }

    var isPlacement = Boolean(panel.querySelector(".hint-digit"));
    legend.querySelectorAll(".legend-item").forEach(function (item) {
      var label = item.querySelector("span:last-child");
      if (!label) return;
      var nextLabel = "";
      if (item.querySelector(".target-dot")) nextLabel = isPlacement ? "Place this digit" : "Key pattern cells";
      if (item.querySelector(".cause-dot")) nextLabel = "Supporting cells";
      if (item.querySelector(".elim-dot")) nextLabel = "Remove this candidate";
      if (nextLabel && label.textContent !== nextLabel) label.textContent = nextLabel;
    });
  }

  function copyCurrentGrid() {
    var getCurrentPuzzleString = window.SudoHint && window.SudoHint.getCurrentPuzzleString;
    var text = typeof getCurrentPuzzleString === "function" ? getCurrentPuzzleString() : "";
    if (!/^[0-9]{81}$/.test(text)) return Promise.reject(new Error("The grid is not ready."));

    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);

    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } finally {
      textarea.remove();
    }
    return Promise.resolve();
  }

  function enhanceBoardSnapshot() {
    var controls = document.querySelector(".hint-controls");
    if (!controls || controls.querySelector(".sudohint-copy-state")) return;

    var button = document.createElement("button");
    button.className = "toggle-btn sudohint-copy-state";
    button.type = "button";
    button.textContent = "Copy grid";
    button.title = "Copy the current 81-character puzzle string";
    button.setAttribute("aria-label", "Copy current grid as an 81-character puzzle string");
    button.addEventListener("click", function () {
      copyCurrentGrid().then(function () {
        button.textContent = "Copied!";
        window.setTimeout(function () { button.textContent = "Copy grid"; }, 1400);
      }).catch(function () {
        button.textContent = "Try again";
        window.setTimeout(function () { button.textContent = "Copy grid"; }, 1400);
      });
    });
    controls.appendChild(button);
  }

  function startCustomUi() {
    createImportUi();

    enhanceHintKey();
    enhanceBoardSnapshot();
    if (window.MutationObserver) {
      new MutationObserver(function () {
        enhanceHintKey();
        enhanceBoardSnapshot();
      }).observe(document.body, { childList: true, subtree: true });
    }

    var attempts = 0;
    var techniqueTimer = window.setInterval(function () {
      enhanceTechniqueList();
      attempts += 1;
      var list = document.querySelector(".technique-list");
      if (list || attempts > 40) {
        window.clearInterval(techniqueTimer);
        if (list && window.MutationObserver) {
          new MutationObserver(enhanceTechniqueList).observe(list, { childList: true, subtree: true });
        }
      }
    }, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startCustomUi);
  } else {
    startCustomUi();
  }
}());
