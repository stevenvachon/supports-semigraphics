"use strict";
const {beforeEach, it} = require("mocha");
const {Duplex, Writable} = require("stream");
const {expect} = require("chai");
const supportsSemigraphics = require("./");



const env = (custom, base=ENV) => Object.entries(base)
	.filter(([key]) => key !== "CI")
	.reduce((result, [key, value]) =>
	{
		result[key] = value;
		return result;
	}, {...custom});



const ARGV = process.argv;
const ENV = env(null, process.env);
const STDERR_IS_TTY = process.stderr.isTTY;
const STDOUT_IS_TTY = process.stdout.isTTY;



beforeEach(() =>
{
	process.argv = ARGV;
	process.env = ENV;
	process.stderr.isTTY = STDERR_IS_TTY;
	process.stdout.isTTY = STDOUT_IS_TTY;
});



it("supports FORCE_ANIMATION", () =>
{
	process.env = env({ FORCE_ANIMATION:"" });
	expect( supportsSemigraphics() ).to.be.true;

	process.env = env({ FORCE_ANIMATION:"true" });
	expect( supportsSemigraphics() ).to.be.true;

	process.env = env({ FORCE_ANIMATION:"false" });
	expect( supportsSemigraphics() ).to.be.false;

	process.env = env({ FORCE_ANIMATION:"1" });
	expect( supportsSemigraphics() ).to.be.true;

	process.env = env({ FORCE_ANIMATION:"0" });
	expect( supportsSemigraphics() ).to.be.false;
});



it("supports --animation", () =>
{
	process.argv = ["--animation"];
	expect( supportsSemigraphics() ).to.be.true;

	process.argv = ["--animation=true"];
	expect( supportsSemigraphics() ).to.be.true;

	process.argv = ["--animation=false"];
	expect( supportsSemigraphics() ).to.be.false;

	process.argv = ["--animation=always"];
	expect( supportsSemigraphics() ).to.be.true;

	process.argv = ["--animations"];
	expect( supportsSemigraphics() ).to.be.true;
});



it("supports --no-animation", () =>
{
	process.argv = ["--no-animation"];
	expect( supportsSemigraphics() ).to.be.false;

	process.argv = ["--no-animations"];
	expect( supportsSemigraphics() ).to.be.false;
});



it("prioritizes --no-animation over --animation", () =>
{
	process.argv = ["--no-animation", "--animation"];
	expect( supportsSemigraphics() ).to.be.false;
});



it("prioritizes FORCE_ANIMATION over --no-animation", () =>
{
	process.argv = ["--no-animation"];
	process.env = env({ FORCE_ANIMATION:"true" });
	expect( supportsSemigraphics() ).to.be.true;
});



it("rejects CI environments", () =>
{
	process.env = env({ CI:"true" });
	expect( supportsSemigraphics() ).to.be.false;
});



it("rejects non-TTY stderr", () =>
{
	process.stderr.isTTY = false;
	expect( supportsSemigraphics(process.stderr) ).to.be.false;
});



it("rejects non-TTY stdout", () =>
{
	process.stdout.isTTY = false;
	expect( supportsSemigraphics(process.stdout) ).to.be.false;
});



it("supports TTY streams", () =>
{
	process.stderr.isTTY = true;
	process.stdout.isTTY = false;
	expect( supportsSemigraphics(process.stderr) ).to.be.true;

	process.stderr.isTTY = false;
	process.stdout.isTTY = true;
	expect( supportsSemigraphics(process.stdout) ).to.be.true;
});



it("rejects non-TTY streams", () =>
{
	expect( supportsSemigraphics( new Duplex() ) ).to.be.false;
	expect( supportsSemigraphics( new Writable() ) ).to.be.false;
});
