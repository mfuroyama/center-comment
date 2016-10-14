'use babel';

var CompositeDisposable = require('atom').CompositeDisposable;
var CommentTypes = require('./comment.json');
var _ = require('lodash');

export default {
    subscriptions: null,
    config: {
        lineLength: {
            title: 'Centered Comment Length',
            description: 'The length of the generated comment, will default to the editor preferred line length',
            type: 'integer',
            default: atom.config.get('editor.preferredLineLength')
        }
    },
    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-center-comment:center': () => this.center()
        }));
    },
    deactivate() {
        this.subscriptions.dispose();
    },
    serialize() {
        return {};
    },
    center() {
        var editor = atom.workspace.getActiveTextEditor();

        // Get the current buffer range at the cursor
        editor.moveToEndOfLine();
        var endPos = editor.getCursorScreenPosition();
        var bufferRange = [{
            column: 0,
            row: endPos.row
        }, endPos];

        // Get the current buffer language
        var scope = atom.workspace.getActiveTextEditor().getRootScopeDescriptor();
        var currentScope = _.get(scope, 'scopes[0]', '');
        var language = currentScope.split('.')[1] || '';

        // Get the current text and convert according to language
        var text = editor.getTextInBufferRange(bufferRange);
        var comment = this.buildCommentString(text, language);
        if (!_.isNull(comment) && (comment !== text)) {
            editor.setTextInBufferRange(bufferRange, comment);
        }
    },
    buildCommentString(line, language) {
        var commentTypes = this.getCommentTypes(language);
        var match = this.getCommentTypeMatch(line, commentTypes.singleline) || this.getCommentTypeMatch(line, commentTypes.multiline);
        console.log(match);
        if (_.isNull(match)) {
            return null;
        }

        var preComment = match[1] + match[2] + match[3];
        var comment = match[5] + (match[6] || '') + match[5];
        var postComment = match[8] + match[9];
        var pad = _.isEmpty(match[4]) ? ' ' : match[4];

        var outerLen = preComment.length + postComment.length;
        var lineLen = atom.config.get('atom-center-comment.lineLength', 80);

        return (preComment + _.pad(comment, lineLen - outerLen, pad) + postComment);
    },
    getCommentTypes(language) {
        return {
            multiline: {
                prefix: CommentTypes.multiline.prefix[language] || '',
                suffix: CommentTypes.multiline.suffix[language] || '',
            },
            singleline: {
                prefix: CommentTypes.singleline.prefix[language] || '',
                suffix: CommentTypes.singleline.suffix[language] || '',
            }
        };
    },
    getCommentTypeMatch(line, commentType) {

        // If successful, the regex will return a match array with the following values:
        // --------------------------
        // 1: Text before the comment
        // 2: Comment prefix token
        // 3: Space after the prefix token
        // 4: Pad character(s)
        // 5: Space before the comment text
        // 6: Comment text
        // 8: Space before the suffix token
        // 9: Comment suffix token
        var prefix = _.escapeRegExp(commentType.prefix);
        var suffix = _.escapeRegExp(commentType.suffix);
        var regexStr = '^(.*?)(' + prefix + ')(\\s?)\\s*([\\-=*]*)\\s*?(\\s?)(\\w.*?)?([ \\-=*]*?)([ ]?)(' + suffix + ')$';
        var regex = new RegExp(regexStr);
        return line.match(regex);
    }
}
