import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';
  word: any = "";
  wordfreq: any = 0;
  inputString = " ";
  highFreq: any = 0;
  threshold: any = 0;
  result: any = [];
  constructor() {
    this.CalculateHighestFrequency();
  }
  getUserInput() {
    return " ";
  }

  cleanInput(str: any) {
    return str.replace(/[?.!,"\(\)]/g, "").replace(/[ ]{2,}/g, "").trim().toLowerCase();
  }


  wordFreq(string: any) {
    return string.split(/\s/).reduce((output: any, word: any) => Object.assign(output, { [word]: output[word] ? output[word] + 1 : 1 }), {});
  }

  sortByValue(obj: any) {
    return Object.entries(obj)
      .map(currentValue => [currentValue[1], currentValue[0]])
      .sort((a: any, b: any) => parseInt(b) - parseInt(a))
      .map((currentValue, index) => [
        currentValue[0],
        currentValue[1]
      ]);
  }
  sortbyName(arr: any) {
    arr = arr.sort(function (a: any, b: any) {
      return a[1].localeCompare(b[1]);
    });
    return arr
  }

 
    CalculateHighestFrequency(){
    const sortedFreq = this.sortByValue(this.wordFreq(this.cleanInput(this.inputString)));
    this.highFreq = sortedFreq[0][0];

  };


  CalculateFrequencyForWord (){
    if (this.word) {
      const sortedFreq = this.sortByValue(this.wordFreq(this.cleanInput(this.inputString)));
      var index = sortedFreq.findIndex(x => x.includes(this.word));
      if (index !== -1) {
        this.word = sortedFreq[index][1];
        this.wordfreq = sortedFreq[index][0]
      }
      console.log(sortedFreq);

    }
  };

    CalculateMostFrequentNWords(){
    const sortedFreq = this.sortByValue(this.wordFreq(this.cleanInput(this.inputString)));
    var arr = [...new Set(sortedFreq.map(x => x[0]))]
    var temparr: any = [];
    for (let index = 0; index < arr.length; index++) {
      temparr = [...temparr, ...this.sortbyName(sortedFreq.filter(arrobj => arrobj[0] === arr[index]))];
    }
    this.result = [...temparr].slice(0, this.threshold);
    console.log("arr2", this.result);
  };
}
