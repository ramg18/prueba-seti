import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'prueba-seti';

  dnaInput: string = '';
  isMutantResult: boolean | null = null;

  isMutant(dna: string[]): boolean {
    const n: number = dna.length; // Tamaño de la matriz NxN


    // Definir las secuencias de ADN mutante
    const sequences: string[] = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];

    // Verificar si hay una secuencia mutante en las filas
    const hasMutantSequenceRow: boolean = dna.some((row) =>
      sequences.some((sequence) => row.includes(sequence))
    );

    // Verificar si hay una secuencia mutante en las columnas
    const hasMutantSequenceColumn: boolean = dna.some((row, rowIndex) => {
      const column: string = dna.map((row) => row[rowIndex]).join('');
      return sequences.some((sequence) => column.includes(sequence));
    });

    // Verificar si hay una secuencia mutante en las diagonales
    const hasMutantSequenceDiagonal: boolean = dna.some((row, rowIndex) => {
      // Verificar la diagonal principal
      if (rowIndex <= n - sequences.length) {
        const diagonal: string = Array.from({ length: sequences.length }, (_, i) => dna[rowIndex + i][i]).join('');
        if (sequences.some((sequence) => diagonal.includes(sequence))) {
          return true;
        }
      }

      // Verificar la diagonal inversa
      if (rowIndex >= sequences.length - 1) {
        const diagonal: string = Array.from({ length: sequences.length }, (_, i) => dna[rowIndex - i][i]).join('');
        if (sequences.some((sequence) => diagonal.includes(sequence))) {
          return true;
        }
      }

      return false;
    });

    // Verificar si hay una secuencia mutante en filas, columnas o diagonales
    return hasMutantSequenceRow || hasMutantSequenceColumn || hasMutantSequenceDiagonal;
  }

  detectMutant() {
    console.log(this.dnaInput);
    
    // Separar las filas ingresadas por salto de línea
    const dnaRows = this.dnaInput.trim().split('\n');

    // Llamar a la función isMutant con las filas de ADN
    this.isMutantResult = this.isMutant(dnaRows);
  }


}
