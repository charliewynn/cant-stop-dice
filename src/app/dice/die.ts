import { Component, ElementRef, ViewChild } from '@angular/core';

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
    ariaLabel: string = "un-rolled die";
    #result: number = 0;
    @ViewChild("die")
    die!: ElementRef;


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
        this.die.nativeElement.ariaLabel = "Die with value " + newResult;
        return newResult;
    }
}
