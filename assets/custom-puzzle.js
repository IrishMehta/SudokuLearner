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
      '  <div class="sudohint-import-actions">',
      '    <button class="sudohint-import-secondary" type="button">Use sample</button>',
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
    var sampleButton = widget.querySelector(".sudohint-import-secondary");
    var clearButton = widget.querySelector(".sudohint-import-quiet");
    var loadButton = widget.querySelector(".sudohint-import-primary");

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
    sampleButton.addEventListener("click", function () {
      textarea.value = samplePuzzle;
      fillEditor(editorInputs, samplePuzzle);
      setEditorStatus("Sample puzzle loaded into the editor.", false);
      textarea.focus();
    });
    clearButton.addEventListener("click", function () {
      fillEditor(editorInputs, "");
      textarea.value = "";
      setEditorStatus("", false);
      editorInputs[0].focus();
    });
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createImportUi);
  } else {
    createImportUi();
  }
}());
