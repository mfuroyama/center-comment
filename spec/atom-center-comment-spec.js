'use babel';

var AtomCenterComment = require('../lib/atom-center-comment');

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomCenterComment', function() {

    beforeEach(function() {
        atom.config.set('editor.preferredLineLength', 100);
    });

    describe('Centered comment conversion', function() {
        it('Handles single-line Javascript comments', function() {
            expect(AtomCenterComment.buildCommentString('// -Dashes', 'js'))
                .toBe('// ---------------------------------------------Dashes----------------------------------------------');
        });
        it('Handles single-line Javascript comments with multi-character pad', function() {
            expect(AtomCenterComment.buildCommentString('// =* MultiCharacter', 'js'))
                .toBe('// =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=* MultiCharacter =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=');
        });
        it('Handles multi-line Javascript comments', function() {
            expect(AtomCenterComment.buildCommentString('/* - Single-line block comment */', 'js'))
                .toBe('/* --------------------------------- Single-line block comment ---------------------------------- */');
        });
        it('Handles single-line Ruby comments', function() {
            expect(AtomCenterComment.buildCommentString('# = Ruby Test', 'rb'))
                .toBe('# =========================================== Ruby Test ============================================');
        });
        it('Handles block-style HTML comments', function() {
            expect(AtomCenterComment.buildCommentString('<!-- * HTML -->', 'html'))
                .toBe('<!-- ****************************************** HTML ******************************************* -->');
        });
        it('Handles spaces in front of comments', function() {
            expect(AtomCenterComment.buildCommentString('    // = Equals', 'js'))
                .toBe('    // ========================================== Equals ===========================================');
        });
        it('Ignores non comment lines', function() {
            expect(AtomCenterComment.buildCommentString('var f = 100;', 'js')).toBeNull();
        });
    });
});
