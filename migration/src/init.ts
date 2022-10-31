import { Region } from 'server/dist/regions/entities';
import { Category } from 'server/dist/articles/entities';
import datasource from './dataSource';
import { readFileSync } from 'node:fs';
import * as path from 'path';

async function init() {
  await insertKoreaRegions();
  console.log('complete insert regions');
  await insertCategories();
  console.log('complete insert categories');
}

async function insertCategories() {
  const categories = readFileSync(path.join(__dirname, 'data', 'categories.txt')).toString();
  const rows = categories.split('\n');

  await Promise.all(rows.map((row) => insertCategory(row)));
}

async function insertKoreaRegions() {
  const regions = readFileSync(path.join(__dirname, 'data', 'regions.txt')).toString();
  const rows = regions.split('\n');

  // 읍면리 저장
  await Promise.all(rows.map((row) => insertRegionIfValid(row)));
}

async function insertCategory(category: string) {
  const [name, imgUrl] = category.split(' ');
  const newCategory = new Category();
  newCategory.name = name;
  newCategory.imgUrl = imgUrl;

  // 중복 체크
  const isUnique = !(await datasource
    .getRepository('category')
    .findOne({ where: { name: category } }));

  if (!isUnique) return;

  return datasource.getRepository('category').save(newCategory);
}

async function insertRegionIfValid(regionInfo: string) {
  const [, region, isExist] = regionInfo.split('\t');

  if (isExist === '폐지') return;

  const isUnique = !(await datasource.getRepository('region').findOne({ where: { name: region } }));

  if (!isUnique) {
    return;
  }

  const reg = /^.*(동|읍|면)$/;
  if (reg.test(region)) {
    const newRegion = new Region();
    newRegion.name = region;
    return datasource.getRepository('region').save(newRegion);
  }
  return;
}

datasource.initialize().then(() => {
  init().then(() => {
    process.exit(0);
  });
});
