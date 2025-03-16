---
title: "Conventional Commits Specification"
description: "The Conventional Commits specification is a lightweight convention that provides a standardized format for writing commit messages."
date: "2024-03-21"
image: "/images/9_conventional_commit.png"
tags: [ "Best Practices"]

---

The Conventional Commits specification is a lightweight convention that provides a standardized format for writing commit messages. It defines a simple set of rules to structure commit messages in a consistent manner, making it easier to understand the purpose and context of each commit. It is based on the above anatomies of git.

By addressing numerous "why", “what” and "how" questions, this specification can enable efficient understanding of past decisions and changes made in the codebase, even after months or years. They serve as an indirect wiki, offering valuable insights into the reasons behind code changes.

## Commit Message Structure

According to this specification, a commit message should be structured as:

```
<commit type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Categorization of Commit Types

### 1. Build
This type is used for changes that affect the build system or external dependencies. For example, if you upgrade a library or modify build configurations, it falls under this category.

```
build: update webpack configuration  
build: update Hive Maven dependency to version 3
```

### 2. Chore
Chore-type commits are for regular maintenance tasks, such as updating dependencies, package manager configurations, or other tasks that don’t modify the source code or affect the behavior of the application.

```
chore: clean up unused dependencies from package.json
```

### 3. CI
Commits related to continuous integration configurations or scripts. This includes changes to tools and processes used for automation and testing.

```
ci: add vault stage to gitlab ci pipeline to fetch api secrets
```

### 4. Docs
Commits that only involve documentation changes, such as updating README files, adding comments, or writing documentation for functions or classes.

```
docs: add control plane rollout instructions to README
```

### 5. Feat
This type is for new features added to the project. If you introduce new functionality or capabilities, it’s considered a feature.

```
feat: introduce real-time notifications for new messages
```

### 6. Fix
Fix-type commits are for patches that resolve bugs or issues in the codebase. If the commit addresses a problem or bug, it falls under this category.

```
fix: resolve issue with form submission not triggering validation
```

### 7. Performance
Commits that improve the performance of the codebase without changing its external behavior. Optimization-related changes would be categorized as performance improvements.

```
perf: optimize guest misconduct database search by reservation for faster retrieval
```

### 8. Refactor
Refactoring commits involve modifications to the code that neither fixes a bug nor adds a feature. Refactoring aims to improve the code’s structure, readability, or maintainability without changing its external behavior.

```
refactor: simplify validation logic in user registration
```

### 9. Revert
Revert-type commits are used when reverting previous changes. It’s essential to mention the commit ID or title of the changes being reverted in the commit message.

```
revert: revert changes made in commit abc123
```

### 10. Style
Commits that are related to code style and formatting. This could include indentation changes, code reformatting, or renaming variables to follow coding conventions.

```
style: format code according to linting rules
```

### 11. Test
Commits that add or modify tests. This includes unit tests, integration tests, or any other kind of automated testing.

```
test: add unit tests for authentication service
```

### 12. BREAKING CHANGE
This is not a commit type but a section in the description as per the conventional commit specification. This introduces changes that are not backward compatible with the existing codebase or API. In other words, it signifies modifications that could potentially break existing functionality or require adjustments in dependent code or configurations.

```
feat: update API response format to include additional fields
```

This commit extends the API response format to include new fields for user profile information. The added fields include 'birthdate' and 'country', providing more comprehensive user data. This change enhances the functionality of the API and enables richer user experiences.

**BREAKING CHANGE:**

- The structure of the API response has been modified to include additional fields.
- Clients relying on the previous response format will need to be updated to accommodate the changes.

Another syntax for breaking change - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with--to-draw-attention-to-breaking-change)

## Usage in Open Source
One of the many open-source examples using the conventional commit specification is Angular.

Link - [angular/CONTRIBUTING.md](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)

```
<type>(<scope>): <short summary>

  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

## What are the advantages?

* **Consistency:** Helps maintain consistency and standardization across commits within the team. When everyone follows the same format, it becomes easier to understand the history of changes.
* **Semantic Meaning:** By categorizing commits into types like feat, fix, docs, chore, etc., conventional commit messages provide semantic meaning to changes. This makes it easier to understand the nature of each commit at a glance.
**Clarity:** Encourages writing clear and descriptive commit messages, including information about the changes made, why they were made, and any associated issue or task identifiers.
* **Communication:** Facilitates communication among team members by providing a structured way to convey information about code changes.
* **Automation:** Enables the use of automated tools that can parse commit messages to generate release notes, changelogs, or perform other tasks based on commit history.

## What are the disadvantages?

* **Inconsistency:** Without guidelines, commit messages may vary widely in format and quality, making it harder to understand the history of changes.
* **Ambiguity:** Lack of structure can lead to vague or incomplete commit messages, which may make it difficult for team members to understand the context or purpose of certain changes.
* **Difficulty in Tracking:** Tracking changes becomes more challenging, especially when trying to understand why certain changes were made or when investigating issues.
* **Miscommunication:** Poorly written commit messages can result in miscommunication or misunderstandings among team members.
* **Manual Processes:** Tasks such as generating release notes or tracking changes may require more manual effort without structured commit messages.

## FAQ about Conventional Commits

Recommended to go over this list - [Conventional Commits](https://www.pranaybathini.com/2024/03/conventional-commit-specification.html)

## Resources

* [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)
* [Commitzen tool for team practices](https://github.com/commitizen/cz-cli)

