import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  readonly NUM_ROWS: number = 3;
  readonly NUM_COLS: number = 3;
  readonly TOTAL_CELLS: number = this.NUM_ROWS * this.NUM_COLS;

  private dashboard: string[][];
  private lastFigure: string = '';

  private counter: number = 0;
  private winner: string = '';

  constructor() {}

  ngOnInit() {
    this.resetDashboard();
  }

  private resetDashboard(): void {
    this.dashboard = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
  }

  private onClickCell(row: number, col: number): void {
    if (this.dashboard[row][col] === '' && this.winner === '') {
      this.dashboard[row][col] = (this.lastFigure === 'x') ? 'o' : 'x';
      this.lastFigure = this.dashboard[row][col];
      this.counter++;

      if (this.counter > 4) {
        // There isn't empty cells
        if (this.counter === this.TOTAL_CELLS) {
          this.winner = 'empate';
        // There is a winner
        } else if (this.isWinner(row, col)) {
          this.winner = this.dashboard[row][col];
        }
      }
    }
  }

  private isWinner(row: number, col:number): boolean {
    let matchRow: boolean = true;
    let matchCol: boolean = true;
    let matchDiag: boolean = true;
    const figure: string = this.dashboard[row][col];

    // Check same row
    for(let c = 0; c < this.NUM_COLS; c++ ) {
      if(this.dashboard[row][c] !== figure) {
        matchRow = false;
        break;
      }
    }

    if (!matchRow) {
      // Check same col
      for(let r = 0; r < this.NUM_ROWS; r++ ) {
        if (this.dashboard[r][col] !== figure) {
          matchCol = false;
          break;
        }
      }
    }
    
    if (!matchCol) {
      if ((row+col) % 2 === 0) {
        // Check diagonal left to right
        for(let r = 0; r < this.NUM_ROWS; r++ ) {
          if (this.dashboard[r][r] !== figure) {
            matchDiag = false;
            break;
          }
        }
        if (!matchDiag) {
          // Check diagonal right to left
          let r:number = 2;
          for(let c = 0; c < this.NUM_COLS; c++ ) {
            if (this.dashboard[c][r] !== figure) {
              matchDiag = false;
              break;
            }
            r--;
          }
        }
      } else {
        // Odd
        matchDiag = false;
      }
    }

    return (matchRow || matchCol || matchDiag);
  }


}
