import { Component, computed, viewChild, viewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Die } from "./dice/die";
import { DieCalcHelper } from './dice/dieCalcHelper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Die],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  checkEvent($event: KeyboardEvent) {
    if (!$event || !$event.key || $event.key === 'Tab') {
      return false; // Ignore Tab key
    }
    $event.preventDefault(); // Prevent default action
    if ($event.key === 'Enter' || $event.key === ' ') {
      return true;
    }
    return false;
  }
  keydownRollDice($event: KeyboardEvent) {
    if (this.checkEvent($event)) {
      this.rollDice();
    }
  }

  keydownSelectPair($event: KeyboardEvent, pair: number[]) {
    if (this.checkEvent($event)) {
      this.selectPair(pair);
    }
  }
  dice = viewChildren(Die);

  chosenPair: number[] = [0, 0];
  protected title = 'cant-stop-dice';
  possiblePairs: number[][] = [];

  toastMessage: string = '';
  toastTimeout: any;

  showToast(message: string) {
    this.toastMessage = message;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 2500);
  }

  async rollDice() {
    if (this.chosenPair.length === 0) {
      this.showToast("Please select a pair before rolling the dice.");
      return;
    }
    console.log("Rolling dice...");

    this.chosenPair = [];
    const rollingDies = computed(() => this.dice().map(die => die.rollDice()));
    const dies = await Promise.all(rollingDies());
    const possiblePairs = DieCalcHelper.CalculatePairs(dies[0], dies[1], dies[2], dies[3]);
    this.possiblePairs = possiblePairs;
    this.chosenPair = [];
  }

  selectPair(pair: number[]) {
    this.chosenPair = pair;
  }
}
