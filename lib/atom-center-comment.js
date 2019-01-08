'use babel';

// eslint-disable-next-line
import { CompositeDisposable } from 'atom';
import buildCommentString from './build-comment-string';

export default {
    subscriptions: null,
    config: {
        lineLength: {
            title: 'Centered Comment Length',
            description: 'The length of the generated comment, will default to the editor preferred line length',
            type: 'integer',
            default: atom.config.get('editor.preferredLineLength'),
        },
    },
    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-center-comment:center': () => this.center(),
        }));
    },
    deactivate() {
        this.subscriptions.dispose();
    },
    serialize() {
        return {};
    },
    center() {
        const editor = atom.workspace.getActiveTextEditor();

        // Get the current buffer range at the cursor
        editor.moveToEndOfLine();
        const positions = editor.getCursorBufferPositions();

        positions.forEach((position) => {
            const bufferRange = [{
                column: 0,
                row: position.row,
            }, position];

            // Get the current buffer language
            const scope = atom.workspace.getActiveTextEditor().getRootScopeDescriptor() || {};
            const currentScope = (scope.scopes instanceof Array) ? scope.scopes[0] : '';
            const language = currentScope.split('.')[1] || '';

            // Get the current text and convert according to language
            const text = editor.getTextInBufferRange(bufferRange);
            const comment = buildCommentString(text, language);
            if ((comment !== null) && (comment !== text)) {
                editor.setTextInBufferRange(bufferRange, comment);
            }
        });
    },
};
