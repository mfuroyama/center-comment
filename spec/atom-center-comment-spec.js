'use babel';

import buildCommentString from '../lib/build-comment-string';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomCenterComment', () => {
    beforeEach(() => {
        atom.config.set('editor.preferredLineLength', 100);
    });

    describe('Centered comment conversion', () => {
        it('Handles single-line Javascript comments', () => {
            expect(buildCommentString('// -Dashes', 'js'))
                .toBe('// ---------------------------------------------Dashes----------------------------------------------');
        });
        it('Handles single-line Javascript comments with multi-character pad', () => {
            expect(buildCommentString('// =* MultiCharacter', 'js'))
                .toBe('// =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=* MultiCharacter =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=');
        });
        it('Handles multi-line Javascript comments', () => {
            expect(buildCommentString('/* - Single-line block comment */', 'js'))
                .toBe('/* --------------------------------- Single-line block comment ---------------------------------- */');
        });
        it('Handles single-line Ruby comments', () => {
            expect(buildCommentString('# = Ruby Test', 'rb'))
                .toBe('# =========================================== Ruby Test ============================================');
        });
        it('Handles block-style HTML comments', () => {
            expect(buildCommentString('<!-- * HTML -->', 'html'))
                .toBe('<!-- ****************************************** HTML ******************************************* -->');
        });
        it('Handles spaces in front of comments', () => {
            expect(buildCommentString('    // = Equals', 'js'))
                .toBe('    // ========================================== Equals ===========================================');
        });
        it('Ignores non comment lines', () => {
            expect(buildCommentString('var f = 100;', 'js')).toBeNull();
        });
    });
});
