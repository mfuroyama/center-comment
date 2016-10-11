# Atom Center Comment

A plugin package for the Atom text editor designed to automatically center comments for headings
and sections in code like this:

```
    // ----------------------------- Section Here -----------------------------
```

This package was inspired by and borrows heavily from (especially the regex) the awesome [Sublime Center Commment](https://github.com/coder-mike/sublime-center-comment)
plugin developed by [coder-mike](https://github.com/coder-mike).


## Background

The motivation for creating this package was two-fold for me:

1. Reproduce the functionality of the sublime-center-comment plugin for Atom. I used
this plugin a lot when Sublime Text was my editor of choice, so when I switched to the
Atom text editor, it surprised me that a similar package didn't exist for Atom.
2. Teach myself how to write and publish an Atom package.


## Usage

The default shortcut key is `cmd+shift+c`, and will center commented text on lines under the current cursor. Currently, the
plugin only supports a single cursor location.

The package uses the default editor 'Preferred Line Length' setting to determine the desired centered comment line length.

## Examples

(Totally taken from the [sublime-center-comment](https://github.com/coder-mike/sublime-center-comment) plugin documentation)

Here are some examples in a C-like language such as C#, Java, and JavaScript, but this should work for other languages as well. Each example shows what it looks like before and after using the command:

```
    // Padded with spaces
    //                            Padded with spaces

    // -Dashes
    // --------------------------------Dashes---------------------------------

    // - Extra Space
    // ----------------------------- Extra Space -----------------------------

    //-No space
    //--------------------------------No space--------------------------------

    // = Equals
    // =============================== Equals ================================

    // * Asterisks
    // ****************************** Asterisks ******************************

    // -
    // -----------------------------------------------------------------------

    // -* Multi-character
    // -*-*-*-*-*-*-*-*-*-*-*-*-*- Multi-character -*-*-*-*-*-*-*-*-*-*-*-*-*-

    /* - Single-line block comment */
    /* -------------------- Single-line block comment --------------------- */
```
