"use strict";
const hasFlag = require("has-flag");
const hasUnicode = require("has-unicode");



function supportsSemigraphics(target)
{
	// Mimicking https://npmjs.com/supports-color
	if ("FORCE_ANIMATION" in process.env)
	{
		return true;
	}
	else if (hasFlag("no-animation") || hasFlag("no-animations") || hasFlag("animation=false"))
	{
		return false;
	}
	else if (hasFlag("animation") || hasFlag("animations") || hasFlag("animation=true") || hasFlag("animation=always"))
	{
		return true;
	}
	else if (process.env.TERM === "dumb")
	{
		return false;
	}
	else
	{
		const isCI = !!(process.env.CI || process.env.CONTINUOUS_INTEGRATION);
		let isTTY;

		if (target == null)
		{
			isTTY = process.stderr.isTTY && process.stdout.isTTY;
		}
		else
		{
			isTTY = !!target.isTTY;
		}

		return !isCI && isTTY && hasUnicode();
	}
}



module.exports = supportsSemigraphics;
