import { DecryptPasswordPipe } from './decrypt-password.pipe';

describe('DecryptPasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new DecryptPasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
