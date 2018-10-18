'use babel';

import CommentTypes from './comment.json';

const DEFAULT_LINE_LENGTH = 80;

const padString = (str, len, chars) => {
    const padLen = len - str.length;
    return str.padStart(Math.floor(padLen / 2) + str.length, chars).padEnd(len, chars);
};

const getCommentTypeMatch = (line, commentTypes) => {
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
    const getMatch = (commentType) => {
        const prefix = commentType.prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const suffix = commentType.suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const regexStr = `^(.*?)(${prefix})(\\s?)\\s*([\\-=*]*)\\s*?(\\s?)(\\w.*?)?([ \\-=*]*?)([ ]?)(${suffix})$`;
        const regex = new RegExp(regexStr);
        return line.match(regex);
    };
    return getMatch(commentTypes.singleline) || getMatch(commentTypes.multiline);
};

const getCommentTypes = language => ({
    multiline: {
        prefix: multiline.prefix[language] || multiline.prefix.default,
        suffix: multiline.suffix[language] || multiline.suffix.default,
    },
    singleline: {
        prefix: singleline.prefix[language] || singleline.prefix.default,
        suffix: singleline.suffix[language] || singleline.suffix.default,
    },
});

export default (line, language) => {
    const commentTypes = getCommentTypes(language);
    const match = getCommentTypeMatch(line, commentTypes);
    if (!match) {
        return null;
    }

    const preComment = [match[1], match[2], match[3]].join('');
    const postComment = [match[8], match[9]].join('');

    const commentStr = [match[5], (match[6] || ''), match[5]].join('');
    const pad = match[4] || ' ';
    const outerLen = preComment.length + postComment.length;
    const lineLen = atom.config.get('atom-center-comment.lineLength', DEFAULT_LINE_LENGTH);
    const comment = padString(commentStr, lineLen - outerLen, pad);

    return [preComment, comment, postComment].join('');
};
