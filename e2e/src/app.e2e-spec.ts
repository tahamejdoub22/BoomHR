import {HarmonyPage} from './app.po';

describe('Babylon App', () => {
    let page: HarmonyPage;

    beforeEach(() => {
        page = new HarmonyPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to Harmony!');
    });
});
