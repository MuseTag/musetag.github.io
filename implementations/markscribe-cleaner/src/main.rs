use anyhow::{Context, Result};
use clap::Parser;
use markscribe_cleaner::CleanupParser;
use std::fs;
use std::path::PathBuf;

/// Clean MarkScribe annotations from text files
#[derive(Parser, Debug)]
#[command(author, version, about)]
struct Args {
    /// Input file path
    #[arg(short, long)]
    input: PathBuf,

    /// Output file path
    #[arg(short, long)]
    output: Option<PathBuf>,
}

fn main() -> Result<()> {
    let args = Args::parse();

    let input_content = fs::read_to_string(&args.input)
        .with_context(|| format!("Failed to read input file: {}", args.input.display()))?;

    let parser = CleanupParser::new();
    let cleaned = parser.clean(&input_content);

    let output_path = args.output.unwrap_or_else(|| {
        let mut path = args.input.clone();
        path.set_extension("md");
        path
    });

    fs::write(&output_path, cleaned)
        .with_context(|| format!("Failed to write output file: {}", output_path.display()))?;

    Ok(())
}
