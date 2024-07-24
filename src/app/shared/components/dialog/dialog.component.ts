import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    ReactiveFormsModule
  ],
  template: `
    <hlm-dialog>
      <button variant="link" class="cursor-pointer" id="edit-profile" brnDialogTrigger hlmBtn>Forgot Password?</button>
      <hlm-dialog-content class="sm:max-w-[425px]" *brnDialogContent="let ctx">
        <form [formGroup]="restorePasswordForm" (ngSubmit)="onSubmit()"> 
          <hlm-dialog-header>
            <h3 hlmDialogTitle>Recuperar Contraseña</h3>
            <p hlmDialogDescription>Escriba el mail de su cuenta. le llegara un correo con los pasos para recuperar la constraseña.</p>
          </hlm-dialog-header>
          <div class="py-4 grid gap-4">
            <div class="items-center grid grid-cols-4 gap-4">
              <label hlmLabel for="mail" class="text-right">Mail</label>
              <input hlmInput id="mail" value="" class="col-span-3" />
            </div>
          </div>
          <hlm-dialog-footer>
            <button hlmBtn type="submit">Enviar</button>
          </hlm-dialog-footer>
        </form>
      </hlm-dialog-content>
    </hlm-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  private readonly _authService = inject(AuthService)

  private readonly emailPattern: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public restorePasswordForm = new FormGroup(
    {
      email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),

    })
    onSubmit(){
      if(this.restorePasswordForm.valid){
        this._authService.forgotPassword(
          this.restorePasswordForm.value.email!
        )
      }
    }
 }
