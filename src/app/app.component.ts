import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { '(document:keypress)': 'key($event)' }
})
export class AppComponent implements OnInit {

  ngOnInit() { this.add(); this.add() }

  grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  modi = false

  spin = () => this.grid = this.grid.map((_, c) => this.grid.map(row => row[c]));
  flip = () => this.grid.forEach(row => row.reverse())
  fsf = () => { this.flip(); this.spin(); this.flip(); }

  colo = (n: number) => {
    const h = (x: number) => x.toString(16).slice(0, 2).padEnd(2, '0')
    return !n ? '#181818' : '#' + h(n ^ 7) + h(n ^ 3) + h(n ^ 5)
  }

  key = (event: any) => {
    this.modi = false
    switch (event.key) {
      case 'a': this.move(); break
      case 'd': this.flip(); this.move(); this.flip(); break
      case 'w': this.spin(); this.move(); this.spin(); break
      case 's': this.fsf(); this.move(); this.fsf(); break
    }
    if (this.modi) this.add()
  }

  add = () => {
    const x = Math.floor(Math.random() * 4)
    const y = Math.floor(Math.random() * 4)
    this.grid[x][y] == 0 ? this.grid[x][y] = (Math.floor(Math.random() * 2) + 1) * 2 : this.add()
  }

  move = () => {
    this.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell != 0) {
          for (let q = j + 1; q <= 3; q++) {
            if (this.grid[i][q] == 0)
              continue
            else if (this.grid[i][q] == cell) {
              this.grid[i][j] *= 2
              this.grid[i][q] = 0
              this.modi = true
              break
            }
            else break
          }
        }
      })
      row.forEach((cell, j) => {
        if (cell != 0) {
          for (let x = 0; x < j; x++) {
            if (this.grid[i][x] == 0) {
              this.grid[i][x] = cell
              this.grid[i][j] = 0
              this.modi = true
              break
            }
          }
        }
      })
    })
  }
}
