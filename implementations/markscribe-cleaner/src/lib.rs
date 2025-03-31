//! Implementation of a MarkScribe Cleanup Parser.
//!
//! The Cleanup Parser removes all visible MarkScribe annotations from text.

#[derive(Debug)]
pub struct CleanupParser;

impl CleanupParser {
    /// Creates a new CleanupParser
    pub fn new() -> Self {
        CleanupParser
    }

    /// Clean MarkScribe annotations from the given text
    ///
    /// # Examples
    /// ```
    /// use markscribe_cleaner::CleanupParser;
    /// let parser = CleanupParser::new();
    ///
    /// assert_eq!(
    ///     parser.clean("@@Jules_Durant talked to @@Marie."),
    ///     "Jules Durant talked to Marie."
    /// );
    /// ```
    pub fn clean(&self, text: &str) -> String {
        self.clean_internal(text, 0).0
    }

    /// Internal recursive method to clean the text
    /// Returns (cleaned_text, end_position)
    fn clean_internal(&self, text: &str, start: usize) -> (String, usize) {
        let chars: Vec<char> = text.chars().collect();
        let mut result = String::new();
        let mut i = start;

        while i < chars.len() {
            // Check for MarkScribe annotation
            if i + 1 < chars.len() && chars[i] == '@' && chars[i+1] == '@' {
                i += 2; // Skip the two @

                // Process different entity types
                if i < chars.len() {
                    if chars[i] == '.' {
                        // Null entity: @@.
                        i += 1;

                        // Check for hidden markdown structures
                        if i < chars.len() && chars[i] == '(' {
                            i += 1;
                            let mut depth = 1;

                            // Traverse until matching closing parenthesis
                            while i < chars.len() && depth > 0 {
                                if chars[i] == '(' {
                                    depth += 1;
                                } else if chars[i] == ')' {
                                    depth -= 1;
                                }
                                i += 1;
                            }
                        }

                        // Skip modifiers
                        i = self.skip_modifiers(&chars, i);

                        // Process bracket content if present
                        if i < chars.len() && chars[i] == '[' {
                            i += 1; // Skip opening bracket
                            let mut depth = 1;

                            // Collect content inside brackets
                            let mut bracket_content = String::new();
                            while i < chars.len() && depth > 0 {
                                if chars[i] == '[' {
                                    depth += 1;
                                    bracket_content.push(chars[i]);
                                } else if chars[i] == ']' {
                                    depth -= 1;
                                    if depth > 0 {
                                        bracket_content.push(chars[i]);
                                    }
                                } else {
                                    bracket_content.push(chars[i]);
                                }
                                i += 1;
                            }

                            // Recursively clean the content inside brackets
                            let cleaned_content = self.clean(&bracket_content);
                            result.push_str(&cleaned_content);
                        }
                    } else if chars[i] == '(' {
                        // Hidden entity: @@(entity)
                        i += 1;
                        let mut depth = 1;

                        // Skip entity name inside parentheses
                        while i < chars.len() && depth > 0 {
                            if chars[i] == '(' {
                                depth += 1;
                            } else if chars[i] == ')' {
                                depth -= 1;
                            }
                            i += 1;
                        }

                        // Skip modifiers
                        i = self.skip_modifiers(&chars, i);

                        // Process bracket content if present
                        if i < chars.len() && chars[i] == '[' {
                            i += 1; // Skip opening bracket
                            let mut depth = 1;

                            // Collect content inside brackets
                            let mut bracket_content = String::new();
                            while i < chars.len() && depth > 0 {
                                if chars[i] == '[' {
                                    depth += 1;
                                    bracket_content.push(chars[i]);
                                } else if chars[i] == ']' {
                                    depth -= 1;
                                    if depth > 0 {
                                        bracket_content.push(chars[i]);
                                    }
                                } else {
                                    bracket_content.push(chars[i]);
                                }
                                i += 1;
                            }

                            // Recursively clean the content inside brackets
                            let cleaned_content = self.clean(&bracket_content);
                            result.push_str(&cleaned_content);
                        }
                    } else {
                        // Visible entity: @@Entity
                        let mut entity_name = String::new();

                        // Extract entity name
                        while i < chars.len() && (chars[i].is_alphanumeric() || chars[i] == '_') {
                            if chars[i] == '_' {
                                entity_name.push(' ');
                            } else {
                                entity_name.push(chars[i]);
                            }
                            i += 1;
                        }

                        // Add entity name to result
                        result.push_str(&entity_name);

                        // Skip modifiers
                        i = self.skip_modifiers(&chars, i);

                        // Process bracket content if present
                        if i < chars.len() && chars[i] == '[' {
                            i += 1; // Skip opening bracket
                            let mut depth = 1;

                            // Collect content inside brackets
                            let mut bracket_content = String::new();
                            while i < chars.len() && depth > 0 {
                                if chars[i] == '[' {
                                    depth += 1;
                                    bracket_content.push(chars[i]);
                                } else if chars[i] == ']' {
                                    depth -= 1;
                                    if depth > 0 {
                                        bracket_content.push(chars[i]);
                                    }
                                } else {
                                    bracket_content.push(chars[i]);
                                }
                                i += 1;
                            }

                            // Add content with proper spacing
                            if !bracket_content.is_empty() {
                                let first_char = bracket_content.chars().next().unwrap();
                                if first_char == ',' || first_char == '.' ||
                                   first_char == '!' || first_char == '?' ||
                                   first_char == ':' || first_char == ';' {
                                    result.push_str(&bracket_content);
                                } else {
                                    result.push(' ');
                                    result.push_str(&bracket_content);
                                }
                            }
                        }
                    }
                }
            } else {
                // Normal character, add to result
                result.push(chars[i]);
                i += 1;
            }
        }

        (result, i)
    }

    /// Utility function to skip modifiers in the text
    fn skip_modifiers(&self, chars: &[char], mut pos: usize) -> usize {
        while pos < chars.len() {
            if chars[pos] == '.' && pos + 1 < chars.len() && chars[pos + 1].is_ascii_alphabetic() {
                pos += 1; // Skip the dot

                // Skip modifier name
                while pos < chars.len() && (chars[pos].is_alphanumeric() || chars[pos] == '_') {
                    pos += 1;
                }

                // Check for parameters
                if pos < chars.len() && chars[pos] == '(' {
                    pos += 1;
                    let mut depth = 1;

                    // Traverse until matching closing parenthesis
                    while pos < chars.len() && depth > 0 {
                        if chars[pos] == '(' {
                            depth += 1;
                        } else if chars[pos] == ')' {
                            depth -= 1;
                        }
                        pos += 1;
                    }
                }
            } else {
                break;
            }
        }

        pos
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simple_entity() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@Jules_Durant walked."),
            "Jules Durant walked."
        );
    }

    #[test]
    fn test_entity_with_modifiers() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@Jules.happy.excited walked."),
            "Jules walked."
        );
    }

    #[test]
    fn test_entity_with_parametric_modifier() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@Jules.age(42).happy walked."),
            "Jules walked."
        );
    }

    #[test]
    fn test_entity_with_punctuation() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@Jules, @@Marie, and @@Bob."),
            "Jules, Marie, and Bob."
        );
    }

    #[test]
    fn test_empty_entity_with_hidden_md() {
        let parser = CleanupParser::new();
        assert_eq!(parser.clean("@@.(### The Poverty)"), "");
    }

    #[test]
    fn test_empty_entity_with_hidden_md_and_modifier() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@.(## Act 1: Setting the Scene).mood(melancholy)"),
            ""
        );
    }

    #[test]
    fn test_one_line_entity_with_modifiers_and_parameter() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@Della.Character.pov.emotional(desperate)"),
            ""
        );
    }

    #[test]
    fn test_one_entity_with_captation() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("Take a look at the @@home[. A furnished flat at $8 per week.]"),
            "Take a look at the home. A furnished flat at $8 per week."
        );
    }

    #[test]
    fn test_nested_entities_with_captation() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("But whenever @@(Jim)[Mr. James Dillingham Young came home and reached his flat above he was called “Jim” and greatly hugged by @@(Della)[Mrs. James Dillingham Young], already introduced to you as Della. Which is all very good.]]"),
            "But whenever Mr. James Dillingham Young came home and reached his flat above he was called “Jim” and greatly hugged by Mrs. James Dillingham Young, already introduced to you as Della. Which is all very good."
        );
    }

    #[test]
    fn test_entities_one_with_captation_one_with_underscore_in_name() {
        let parser = CleanupParser::new();
        assert_eq!(
            parser.clean("@@Della[finished her cry]. To-morrow would be @@Christmas_Day"),
            "Della finished her cry. To-morrow would be Christmas Day"
        );
    }
}
