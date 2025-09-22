#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function formatDate(dateInput) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  return `${year} - ${month}`;
}

function parseFileDate(dateInput) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function createPost() {
  console.log('📝 Creating a new blog post...\n');

  const title = await prompt('Post title: ');
  if (!title) {
    console.log('❌ Title is required');
    process.exit(1);
  }

  const dateInput = await prompt('Date (YYYY-MM-DD): ');
  if (!dateInput) {
    console.log('❌ Date is required');
    process.exit(1);
  }

  const imgPath = await prompt('Thumbnail image URL: ');
  if (!imgPath) {
    console.log('❌ Thumbnail image URL is required');
    process.exit(1);
  }

  const description = await prompt('Description: ');
  if (!description) {
    console.log('❌ Description is required');
    process.exit(1);
  }

  const slug = createSlug(title);
  const formattedDate = formatDate(dateInput);
  const fileDate = parseFileDate(dateInput);
  const filename = `${fileDate}-${slug}.md`;
  const filepath = path.join(__dirname, 'posts', filename);

  if (fs.existsSync(filepath)) {
    console.log(`❌ Post already exists: ${filename}`);
    process.exit(1);
  }

  const content = `---
title: "${title}"
date: "${formattedDate}"
img_path: "${imgPath}"
description: "${description}"
---


# ${title.toUpperCase()}

## ${description}


![image](YOUR_IMAGE_URL_HERE)


`;

  fs.writeFileSync(filepath, content);

  console.log(`✅ Post created successfully!`);
  console.log(`📄 File: posts/${filename}`);
  console.log(`🔗 Path: ${filepath}`);

  rl.close();
}

createPost().catch((error) => {
  console.error('❌ Error creating post:', error);
  process.exit(1);
});