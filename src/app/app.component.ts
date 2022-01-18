import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputValue: string = '';
  resultValue: string = '';

  messages: {
    error: string;
  } = {
    error: 'ERROR',
  };

  calculatorMainProcess(input: string) {
    this.setInputValue(input);

    let strActual: string = this.inputValue;
    let contador: number = 100;
    do {
      let parentPeque: string = this.determinateLastParenthesis(strActual);
      let solve: string = this.division(parentPeque);
      strActual = strActual.replace(parentPeque, solve);
      contador--;
    } while (
      contador > 0 &&
      strActual != this.messages.error &&
      isNaN(Number(strActual))
    );
    if (contador == 1) {
      console.log('Contador finalizado');
    }
    this.resultValue = strActual;
  }

  division(operacion: string): string {
    let resultado: string = '';
    let exprEvaluar: string = this.removeParenthesis(operacion);
    let arrayEvaluar: string[] = exprEvaluar.split('/');
    switch (arrayEvaluar.length) {
      case 1:
        {
          if (isNaN(Number(arrayEvaluar[0]))) {
            resultado = this.resta(arrayEvaluar[0]);
          }
          if (!isNaN(Number(arrayEvaluar[0]))) {
            resultado = arrayEvaluar[0];
          }
        }
        break;
      case 2:
        {
          if (arrayEvaluar[1] == '0') {
            resultado = this.messages.error;
          }
          if (
            resultado == '' &&
            arrayEvaluar.some((x) => {
              return isNaN(Number(x));
            })
          ) {
            arrayEvaluar[0] = this.resta(arrayEvaluar[0]);
            arrayEvaluar[1] = this.resta(arrayEvaluar[1]);
          }
          if (
            resultado == '' &&
            !isNaN(Number(arrayEvaluar[0])) &&
            !isNaN(Number(arrayEvaluar[1]))
          ) {
            let a = Number(arrayEvaluar[0]);
            let b = Number(arrayEvaluar[1]);
            resultado = (a / b).toString();
          }
        }
        break;
      default:
        resultado = this.messages.error;
    }
    if (resultado == '' || arrayEvaluar.length >= 3)
      resultado = this.messages.error;
    return resultado;
  }

  resta(operacion: string): string {
    let result: string = '';
    let exprEvaluar: string = this.removeParenthesis(operacion);
    let arrayEvaluar: string[] = exprEvaluar.split('-');
    switch (arrayEvaluar.length) {
      case 1:
        {
          if (isNaN(Number(arrayEvaluar[0]))) {
            result = this.suma(arrayEvaluar[0]);
          }
          if (!isNaN(Number(arrayEvaluar[0]))) {
            result = arrayEvaluar[0];
          }
        }
        break;
      case 2:
        {
          if (
            arrayEvaluar.some((x) => {
              return isNaN(Number(x));
            })
          ) {
            arrayEvaluar[0] = this.suma(arrayEvaluar[0]);
            arrayEvaluar[1] = this.suma(arrayEvaluar[1]);
          }
          if (arrayEvaluar[0] == arrayEvaluar[1]) {
            result = '0';
          }
          if (
            result == '' &&
            !isNaN(Number(arrayEvaluar[0])) &&
            !isNaN(Number(arrayEvaluar[1]))
          ) {
            let a = Number(arrayEvaluar[0]);
            let b = Number(arrayEvaluar[1]);
            result = (a - b).toString();
          }
        }
        break;
      default:
        result = '';
    }
    if (arrayEvaluar.length >= 3) {
      let tempArray = arrayEvaluar.map((elm) => {
        return this.suma(elm);
      });
      if (
        tempArray.every((elmx) => {
          return !isNaN(Number(elmx));
        })
      ) {
        let tempRes = Number(tempArray[0]);
        for (let x = 1; x <= tempArray.length; x++) {
          tempRes = tempRes - Number(tempArray[x]);
        }
        result = tempRes.toString();
      }
    }
    if (result == '') {
      result = this.messages.error;
    }
    return result;
  }

  suma(operacion: string): string {
    let result: string = '';
    let exprEvaluar: string = this.removeParenthesis(operacion);
    let arrayEvaluar: string[] = exprEvaluar.split('+');
    switch (arrayEvaluar.length) {
      case 1:
        {
          if (isNaN(Number(arrayEvaluar[0]))) {
            result = this.multiplicar(arrayEvaluar[0]);
          }
          if (!isNaN(Number(arrayEvaluar[0]))) {
            result = arrayEvaluar[0];
          }
        }
        break;
      case 2:
        {
          if (
            arrayEvaluar.some((x) => {
              return isNaN(Number(x));
            })
          ) {
            arrayEvaluar[0] = this.multiplicar(arrayEvaluar[0]);
            arrayEvaluar[1] = this.multiplicar(arrayEvaluar[1]);
          }
          if (
            result == '' &&
            !isNaN(Number(arrayEvaluar[0])) &&
            !isNaN(Number(arrayEvaluar[1]))
          ) {
            let a = Number(arrayEvaluar[0]);
            let b = Number(arrayEvaluar[1]);
            result = (a + b).toString();
          }
        }
        break;
      default:
        result = '';
    }
    if (arrayEvaluar.length >= 3) {
      let tempArray = arrayEvaluar.map((elm) => {
        return this.multiplicar(elm);
      });
      if (
        tempArray.every((elmx) => {
          return !isNaN(Number(elmx));
        })
      ) {
        let tempRes = Number(tempArray[0]);
        for (let x = 1; x <= tempArray.length; x++) {
          tempRes = tempRes + Number(tempArray[x]);
        }
        result = tempRes.toString();
      }
    }
    if (result == '') {
      result = this.messages.error;
    }
    return result;
  }

  multiplicar(evaluar: string) {
    let resultado: string = '';
    let exprEvaluar: string = this.removeParenthesis(evaluar);
    let arrayEvaluar: string[] = exprEvaluar.split('*');
    switch (arrayEvaluar.length) {
      case 1:
        {
          if (!isNaN(Number(arrayEvaluar[0]))) {
            resultado = arrayEvaluar[0];
          }
        }
        break;
      case 2:
        {
          if (
            !isNaN(Number(arrayEvaluar[0])) &&
            !isNaN(Number(arrayEvaluar[1]))
          ) {
            let a = Number(arrayEvaluar[0]);
            let b = Number(arrayEvaluar[1]);
            resultado = (a * b).toString();
          }
        }
        break;
      default:
        resultado = '';
    }
    if (arrayEvaluar.length >= 3) {
      if (
        arrayEvaluar.every((elmx) => {
          return !isNaN(Number(elmx));
        })
      ) {
        let tempRes = Number(arrayEvaluar[0]);
        for (let x = 1; x <= arrayEvaluar.length; x++) {
          tempRes = tempRes * Number(arrayEvaluar[x]);
        }
        resultado = tempRes.toString();
      }
    }
    if (resultado == '') {
      resultado = this.messages.error;
    }
    return resultado;
  }

  setInputValue(input: string): void {
    this.inputValue = input;
  }

  resetResult(): void {
    this.inputValue = '';
    this.resultValue = '';
  }

  determinateLastParenthesis(analize: string): string {
    let result: string = '';
    let lastIndexParenthesis: number = analize.lastIndexOf('(');
    let almostDone: number = analize.indexOf(')', lastIndexParenthesis);
    result = analize.substring(lastIndexParenthesis, almostDone + 1);
    if (result == '') {
      result = analize;
    }
    return result;
  }

  removeParenthesis(valor: string): string {
    let resultado = valor.replace('(', '');
    resultado = resultado.replace(')', '');
    return resultado;
  }
}
