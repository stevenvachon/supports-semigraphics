"use strict";
const expect = require("chai").expect;
const stream = require("stream");
const supportsSemigraphics = require("./");

const argv = process.argv;
const env = process.env;
const stderr_isTTY = process.stderr.isTTY;
const stdout_isTTY = process.stdout.isTTY;

delete env.CI;
delete env.CONTINUOUS_INTEGRATION;



beforeEach( function()
{
	process.argv = argv;
	process.env = env;
	process.stderr.isTTY = stderr_isTTY;
	process.stdout.isTTY = stdout_isTTY;
});



it("supports FORCE_ANIMATION", function()
{
	process.env = { FORCE_ANIMATION:true };
	expect( supportsSemigraphics() ).to.be.true;
});



it("supports --animation", function()
{
	process.argv = ["--animation"];
	expect( supportsSemigraphics() ).to.be.true;

	process.argv = ["--animation=true"];
	expect( supportsSemigraphics() ).to.be.true;

	process.argv = ["--animation=false"];
	expect( supportsSemigraphics() ).to.be.false;

	process.argv = ["--animation=always"];
	expect( supportsSemigraphics() ).to.be.true;
});



it("supports --animations", function()
{
	process.argv = ["--animations"];
	expect( supportsSemigraphics() ).to.be.true;
});



it("supports --no-animation", function()
{
	process.argv = ["--no-animation"];
	expect( supportsSemigraphics() ).to.be.false;
});



it("supports --no-animations", function()
{
	process.argv = ["--no-animations"];
	expect( supportsSemigraphics() ).to.be.false;
});



it("prioritizes --no-animation over --animation", function()
{
	process.argv = ["--no-animation", "--animation"];
	expect( supportsSemigraphics() ).to.be.false;
});



it("prioritizes FORCE_ANIMATION over --no-animation", function()
{
	process.argv = ["--no-animation"];
	process.env = { FORCE_ANIMATION:true };
	expect( supportsSemigraphics() ).to.be.true;
});



it("rejects CI environments", function()
{
	process.env = { CI:true };
	expect( supportsSemigraphics() ).to.be.false;

	process.env = { CONTINUOUS_INTEGRATION:true };
	expect( supportsSemigraphics() ).to.be.false;
});



it("rejects non-TTY stderr", function()
{
	process.stderr.isTTY = false;
	expect( supportsSemigraphics() ).to.be.false;
});



it("rejects non-TTY stdout", function()
{
	process.stdout.isTTY = false;
	expect( supportsSemigraphics() ).to.be.false;
});



it("supports TTY streams", function()
{
	process.stderr.isTTY = true;
	process.stdout.isTTY = false;
	expect( supportsSemigraphics(process.stderr) ).to.be.true;

	process.stderr.isTTY = false;
	process.stdout.isTTY = true;
	expect( supportsSemigraphics(process.stdout) ).to.be.true;
});



it("rejects non-TTY streams", function()
{
	expect( supportsSemigraphics( new stream.Duplex() ) ).to.be.false;
	expect( supportsSemigraphics( new stream.Writable() ) ).to.be.false;
});
