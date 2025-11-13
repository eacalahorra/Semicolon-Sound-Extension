import * as vscode from 'vscode';
import * as path from 'path';

const sound: any = require('sound-play');

let lastPlay = 0;
const COOLDOWN_MS = 120;

export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeTextDocument(event => {
		for (const change of event.contentChanges) {
			const isInsertion = change.rangeLength === 0 && change.text.length > 0;
			if (!isInsertion) continue;
			if (change.text === ';' || (change.text.length <= 3 && change.text.includes(';'))) {
				playSemicolonSound(context);
			}
		}
	});
}

function playSemicolonSound(context: vscode.ExtensionContext) {
	const now = Date.now();
	if (now - lastPlay < COOLDOWN_MS) return;
	lastPlay = now;

	const soundPath = path.join(context.extensionPath, 'media', 's-s-e_soundeffect.wav');
	sound.play(soundPath).catch((err:unknown) => console.error('sound-play error:', err));
}

export function deactivate() {}