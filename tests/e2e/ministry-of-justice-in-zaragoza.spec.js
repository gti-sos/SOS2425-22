// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:16078');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Inicio/);
});

test('get ministry link', async ({ page }) => {
  await page.goto('localhost:16078');

  // Click the get started link.
  await page.getByRole('link', { name: 'FrontEnd Juan Manuel Ríos López' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle(/Ministry of Justice in Zaragoza/);
});


test('create, filter, edit and delete ministry', async ({ page }) => {
  const testProvince = "__TEST_NAME__";
  const testNumParams = "1000000000";
  const testParams = "__TEST_TXT__";
  const testEdit = "123456789";

  await page.goto('localhost:16078');

  // Click the get started link.
  await page.getByRole('link', { name: 'FrontEnd Juan Manuel Ríos López' }).click();
  await expect(page).toHaveTitle(/Ministry of Justice in Zaragoza/);

  // fill the forms and create ministry
  await page.getByRole('textbox', { name: 'Provincia' }).fill(testProvince);
  await page.getByPlaceholder('Año creación').fill(testNumParams);
  await page.getByPlaceholder('ID', { exact: true }).fill(testNumParams);
  await page.getByPlaceholder('Portal ID').fill(testNumParams);
  await page.getByPlaceholder('Código postal').fill(testNumParams);
  await page.getByPlaceholder('Latitud').fill(testNumParams);
  await page.getByPlaceholder('Longitud').fill(testNumParams);
  await page.getByRole('textbox', { name: 'Título' }).fill(testParams);
  await page.getByRole('textbox', { name: 'Tipo equipo' }).fill(testParams);
  await page.getByRole('textbox', { name: 'Titularidad' }).fill(testParams);
  await page.getByRole('textbox', { name: 'Dirección' }).fill(testParams);
  await page.getByPlaceholder('Año', { exact: true }).fill(testNumParams);
  await page.getByPlaceholder('Trabajadores').fill(testNumParams);
  await page.getByRole('button', { name: 'Crear' }).click();

  // search the new ministry
  await page.getByPlaceholder('ID mínimo').fill(testNumParams)
  await page.getByRole('button', { name: 'Buscar' }).click();

  // click the edit button
  await page.getByRole('button', { name: 'Editar' }).click();
  await expect(page).toHaveTitle(/Editar/);

  // edit the new ministry
  await page.getByRole('row', { name: 'Creation Year' }).getByRole('spinbutton').fill(testEdit);
  await page.getByRole('button', { name: 'Guardar Cambios' }).click();
  
  // search the edited ministry and delete it
  await page.getByPlaceholder('ID mínimo').fill(testNumParams)
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('button', { name: 'Eliminar', exact: true }).click();
});
