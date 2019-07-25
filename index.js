"use strict";
const hasFlag = require("has-flag");
const hasUnicode = require("has-unicode");
const isInteractive = require("is-interactive");
const isWindows = require("is-windows");
const terminfo = require("terminfo");



const ANIMATION_FLAGS =
[
	"animation",
	"animation=always",
	"animation=true",
	"animations"
];



const NO_ANIMATION_FLAGS =
[
	"animation=false",
	"no-animation",
	"no-animations"
];



const TERMINFO_PROPERTIES =
[
	"backColorErase",
	"canChange",
	"clearAllTabs",
	"clearScreen",
	"clrBol",
	"clrEol",
	"clrEos",
	"deleteCharacter",
	"deleteLine",
	"eraseChars"
];



// Mimicks some of https://npmjs.com/supports-color
const supportsSemigraphics = stream =>
{
	if ("FORCE_ANIMATION" in process.env)
	{
		const value = process.env.FORCE_ANIMATION;

		if (value==="true" || value.length===0)
		{
			return true;
		}
		else if (value === "false")
		{
			return false;
		}
		else
		{
			return !!parseInt(value, 10);
		}
	}
	else if (NO_ANIMATION_FLAGS.some(flag => hasFlag(flag)))
	{
		return false;
	}
	else if (ANIMATION_FLAGS.some(flag => hasFlag(flag)))
	{
		return true;
	}
	else if (!isInteractive({ stream }))
	{
		return false;
	}
	else if (isWindows())
	{
		return null; // TODO :: ??
	}
	else if (!hasUnicode()) // always `false` for Windows
	{
		return false;
	}
	else
	{
		const filteredCapabilities = Object.entries(terminfo()).filter(([key]) => TERMINFO_PROPERTIES.includes(key));

		if (filteredCapabilities.length !== TERMINFO_PROPERTIES.length)
		{
			return false;
		}
		else
		{
			return filteredCapabilities.every(value => !!value);
		}
	}
};



module.exports = supportsSemigraphics;
