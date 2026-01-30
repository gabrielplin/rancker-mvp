'use client';
import { useForm } from 'react-hook-form';
import {
  EmailIcon,
  InstagramIcon,
  LogoTextIcon,
  PhoneIcon,
  SmallEmailIcon,
  WhatsAppIcon
} from '../../icons';
import { ButtonTag } from '../button';
import { TextFieldTag } from '../text-field';
import './footer.styles.scss';
import { DividerTag } from '../divider';

function FooterComponent() {
  const { control } = useForm();
  return (
    <footer className='footer-wrapper'>
      <div className='footer-wrapper__newsletter'>
        <div className='box-infoContact'>
          <LogoTextIcon />

          <div className='box-item'>
            <PhoneIcon />
            <div>
              <p>Ficou com alguma dúvida?</p>
              <span>+(55) 11 91111-1111</span>
            </div>
          </div>

          <div className='box-item'>
            <EmailIcon />
            <div>
              <p>Entre em contato</p>
              <span>contato@rancker.com</span>
            </div>
          </div>
        </div>

        <div className='box-newsletter'>
          <h3>Newsletter</h3>
          <p>Receba todas as atualizações da Rancker e fique por dentro.</p>

          <div className='form-newsletter'>
            <TextFieldTag
              control={control}
              label='E-mail'
              name='newsletter-email'
              type='text'
              placeholder='informe seu e-mail'
            />
            <ButtonTag label='Cadastrar-se' primary />
          </div>
        </div>
      </div>

      <div className='footer-wrapper__list-links'>
        <ul>
          <span>Rancker</span>
          <li>Quem somos</li>
          <li>Nossos torneios</li>
          <li>Ranking</li>
        </ul>
        <ul>
          <span>Planos</span>
          <li>Para Atletas</li>
          <li>Para Organizadores</li>
          <li>Arenas Parceiras</li>
        </ul>
        <ul>
          <span>Contato</span>
          <li>Falar no WhatsApp</li>
          <li>Enviar E-mail</li>
          <li>Instagram</li>
        </ul>
        <ul>
          <span>Segurança</span>
          <li>Termos e Uso</li>
          <li>Política e Privacidade</li>
          <li>Política de Cookies</li>
        </ul>
      </div>

      <DividerTag />

      <div className='footer-wrapper__copyright-web'>
        <div className='copyright-midia'>
          <span>Acompanhe a Rancker</span>
          <ul>
            <li>
              <WhatsAppIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>
            <li>
              <SmallEmailIcon />
            </li>
          </ul>
        </div>

        <p className='copyright-text'>
          Copyright © 2024 Rancker | Todos os direitos reservados.
        </p>
      </div>

      <div className='footer-wrapper__copyright-mob'>
        <div className='box-copy'>
          <LogoTextIcon />

          <p className='copyright-text'>
            Copyright © 2024 Rancker <br /> Todos os direitos reservados.
          </p>
        </div>

        <div className='box-item'>
          <PhoneIcon />
          <div>
            <p>Ficou com alguma dúvida?</p>
            <span>+(55) 11 91111-1111</span>
          </div>
        </div>

        <div className='box-item'>
          <EmailIcon />
          <div>
            <p>Entre em contato</p>
            <span>contato@rancker.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
