import { Component } from '@angular/core';

@Component({
    selector: 'die',
    templateUrl: './die.html',
    styleUrl: './die.scss'
})
export class Die {

    private numSides: number = 6;
    private minRollTime: number = 500;
    private maxRollTime: number = 1500;
    protected rolling: boolean = false;
    #result: number = 0;

    public get result(): number {
        return this.#result;
    }

    private set result(newValue: number) {
        this.#result = Math.max(0, newValue);
    }

    async rollDice() {
        this.rolling = true;
        const rollTime = this.minRollTime + Math.random() * (this.maxRollTime - this.minRollTime);
        const newResult = Math.ceil(Math.random() * this.numSides);
        const rollingInterval = setInterval(() => {
            this.result = Math.ceil(Math.random() * this.numSides);
        }, 20);
        await new Promise(resolve => setTimeout(resolve, rollTime));
        clearInterval(rollingInterval);
        this.rolling = false;
        this.result = newResult;
        return newResult;
    }
}
