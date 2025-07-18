import { Component, computed, ElementRef, ViewChild, viewChild, viewChildren } from '@angular/core';
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

  protected title = 'cant-stop-dice';

  dice = viewChildren(Die);
  
  @ViewChild("modal")
  modal!: ElementRef;

  chosenPair: number[] = [0, 0];
  possiblePairs: number[][] = [];

  toastMessage: string = '';
  toastTimeout: number | null = null;

  showModal: boolean = false;

  showToast(message: string) {
    this.toastMessage = message;
    this.toastTimeout && clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 2500);
  }

  async rollDice($event: KeyboardEvent | null = null) {
    if ($event && !this.checkEvent($event)) {
      return; // Ignore non-Enter/Space key events
    }

    if (this.chosenPair.length === 0) {
      this.showToast("Please select a pair before rolling the dice.");
      return;
    }
    console.log("Rolling dice...");

    this.chosenPair = [];
    // get list of dice rolling Promises
    const rollingDies = computed(() => this.dice().map(die => die.rollDice()));
    const dies = await Promise.all(rollingDies());
    console.log("Dice rolled:", dies);
    const possiblePairs = DieCalcHelper.CalculatePairs(dies[0], dies[1], dies[2], dies[3]);
    this.possiblePairs = possiblePairs;
    console.log("Possible pairs:", possiblePairs.map(p => `[${p[0]} & ${p[1]}]`));
    this.chosenPair = [];
  }

  selectPair(pair: number[], $event: KeyboardEvent | null = null) {
    if (!$event || this.checkEvent($event)) {
      this.chosenPair = pair;
    }
  }

  showInfoModal($event: KeyboardEvent | null = null) {
    if ($event && !this.checkEvent($event)) {
      return; // Ignore non-Enter/Space key events
    }
    this.showModal = true;
    setTimeout(() => {
      this.modal.nativeElement.focus();
    }, 1);

  }
  onModalKeydown($event: KeyboardEvent, isClose: boolean) {
    if ($event.key === 'Escape') {
      this.showModal = false;
    }
    if (isClose && ($event.key === 'Enter' || $event.key === ' ')) {
      this.showModal = false;
    }
  }

  private checkEvent($event: KeyboardEvent) {
    if (!$event || !$event.key || $event.key === 'Tab') {
      return false; // Ignore Tab key
    }
    $event.preventDefault(); // Prevent default action
    if ($event.key === 'Enter' || $event.key === ' ') {
      return true;
    }
    return false;
  }
}
