import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { provideIcons } from '@ng-icons/core';
import {
  tablerBrandGoogle,
  tablerEye,
  tablerEyeClosed,
} from '@ng-icons/tabler-icons';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmCheckboxModule } from '@spartan-ng/ui-checkbox-helm';
import { DialogComponent } from "../shared/components/dialog/dialog.component";
enum ActionType {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  host: {
    class: 'block w-full max-w-lg',
  },
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmCheckboxModule,
    DialogComponent
],
  providers: [provideIcons({ tablerBrandGoogle, tablerEye, tablerEyeClosed })],
  template: ` <div class="block w-full max-w-lg">
    <hlm-tabs tab="IniciarSesion" class="w-full">
      <hlm-tabs-list
        class="w-full grid grid-cols-2 bg-transparent/10 dark:bg-transparent/40"
        aria-label="tabs example"
      >
        <button
          hlmTabsTrigger="IniciarSesion"
          (click)="this.action.set(ActionType.SignIn)"
        >
          Iniciar Sesión
        </button>
        <button
          hlmTabsTrigger="Registrarse"
          (click)="this.action.set(ActionType.SignUp)"
        >
          Registrarse
        </button>
      </hlm-tabs-list>
      <form [formGroup]="authForm" (ngSubmit)="onSubmit()">
        <div hlmTabsContent="IniciarSesion">
          <Section hlmCard class="bg-transparent/10 dark:bg-transparent/40">
            <div hlmCardHeader>
              <h3 hlmCardTitle>Iniciar Sesión</h3>
              <p hlmCardDescription>Ingresa tus datos.</p>
            </div>
            <div hlmCardContent>
              <button hlmBtn class="w-full">
                <hlm-icon class="mr-2" name="tablerBrandGoogle" />
                Iniciar con Google
              </button>
              <label class="block my-4" hlmLabel>
                Email
                <input
                  class="mt-1.5 w-full"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  formControlName="email"
                  hlmInput
                />
              </label>
              <label class="block my-4" hlmLabel>
                Contraseña
                <div class="flex items-center w-full space-x-2">
                  <input
                    class="mt-1.5 w-full"
                    [type]="showPassword() ? 'password' : 'text'"
                    placeholder="******"
                    formControlName="password"
                    hlmInput
                  />
                  <button
                    type="button"
                    (click)="toggleShowPassword()"
                    class="mt-1.5"
                    hlmBtn
                    size="icon"
                    variant="outline"
                  >
                    @if(showPassword()){
                    <hlm-icon size="sm" name="tablerEyeClosed" />
                    }@else{<hlm-icon size="sm" name="tablerEye" />}
                  </button>
                </div>
              </label>
              
              <div class="flex w-full justify-between"> 
                <label class="flex items-center" hlmLabel>
                  <hlm-checkbox class="mr-2" />
                    Remember me
                </label>
                <app-dialog />
              </div>
            </div>
            <div hlmCardFooter>
              <button hlmBtn>Iniciar Sesión</button>
            </div>
          </Section>
        </div>
        <div hlmTabsContent="Registrarse">
          <Section hlmCard class="bg-transparent/10 dark:bg-transparent/40">
            <div hlmCardHeader>
              <h3 hlmCardTitle>Registrarse</h3>
              <p hlmCardDescription>Cree su cuenta.</p>
            </div>
            <p hlmCardContent>
              <label class="block my-4" hlmLabel>
                Email
                <input
                  class="mt-1.5 w-full"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  formControlName="email"
                  hlmInput
                />
              </label>
              <label class="block my-4" hlmLabel>
                Contraseña
                <div class="flex items-center w-full space-x-2">
                  <input
                    class="mt-1.5 w-full"
                    [type]="showPassword() ? 'password' : 'text'"
                    placeholder="******"
                    formControlName="password"
                    hlmInput
                  />
                  <button
                    type="button"
                    (click)="toggleShowPassword()"
                    class="mt-1.5"
                    hlmBtn
                    size="icon"
                    variant="outline"
                  >
                    @if(showPassword()){
                    <hlm-icon size="sm" name="tablerEyeClosed" />
                    }@else{<hlm-icon size="sm" name="tablerEye" />}
                  </button>
                </div>
              </label>
              <label class="block my-4" hlmLabel>
                Reescriba su contraseña
                <input
                  class="mt-1.5 w-full"
                  formControlName="confirmPassword"
                  type="password"
                  placeholder="******"
                  hlmInput
                />
              </label>
            </p>
            <div hlmCardFooter>
              <button type="submit" hlmBtn>Registrarse</button>
            </div>
          </Section>
        </div>
      </form>
    </hlm-tabs>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly _authService = inject(AuthService);
  public readonly action: WritableSignal<ActionType> = signal<ActionType>(
    ActionType.SignIn
  );
  public readonly ActionType = ActionType;
  public showPassword: WritableSignal<boolean> = signal<boolean>(true);

  private readonly emailPattern: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }

  public authForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [Validators.minLength(5)]),
    },
    { validators: this.passwordMatchValidator }
  );

  public onSubmit(): void {
    const { email, password } = this.authForm.value;

    if (this.authForm.valid) {
      this.action() === ActionType.SignIn
        ? this._authService.signIn(email!, password!)
        : this._authService.signUp(email!, password!);
    }
  }
  private get passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.action() !== ActionType.SignUp) {
        return null;
      }

      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      return password &&
        confirmPassword &&
        password.value !== confirmPassword.value
        ? { mismatch: true }
        : null;
    };
  }
}
