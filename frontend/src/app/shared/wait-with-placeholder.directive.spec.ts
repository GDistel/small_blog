import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { WaitWithPlaceholder } from "./wait-with-placeholder.directive";

@Component({
    template: `
        <img
            appWaitWithPlaceholder="assets/images/placeholder.png"
            src="https://www.somewebsite.com/image"
            class="mock-target"
            alt="Mock target image">
    `
})
class MockTargetComponent { }

describe('WaitWithPlaceholder directive', () => {
    let mockTargetComponentFixture: ComponentFixture<MockTargetComponent>;
    let targetImgDE: DebugElement;
    let placeholderImgDE: DebugElement;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [
                MockTargetComponent,
                WaitWithPlaceholder
            ]
        }).compileComponents();
        mockTargetComponentFixture = TestBed.createComponent(MockTargetComponent);
        mockTargetComponentFixture.detectChanges();
        [targetImgDE, placeholderImgDE] = mockTargetComponentFixture.debugElement.queryAll(By.css('img'));
        await mockTargetComponentFixture.whenStable();
    });

    it('should set the display of the target image to none', () => {
        expect(targetImgDE.styles['display']).toBe('none');
    });

    it('should create the placeholder image element', () => {
        expect(placeholderImgDE).toBeTruthy();
    });

    it('the placeholder image element should have the correct attributes', () => {
        expect(placeholderImgDE.nativeElement.getAttribute('src')).toBe('assets/images/placeholder.png');
        expect(placeholderImgDE.nativeElement.getAttribute('alt')).toBe('Mock target image placeholder');
        expect(placeholderImgDE.nativeElement.getAttribute('class')).toBe('mock-target');
    });

    it('should only display the target image when this one loads', () => {
        targetImgDE.triggerEventHandler('load', null);
        mockTargetComponentFixture.detectChanges();
        [targetImgDE, placeholderImgDE] = mockTargetComponentFixture.debugElement.queryAll(By.css('img'));
        expect(placeholderImgDE).toBeUndefined();
        expect(targetImgDE.styles['display']).toBe('');
    });

});