import {test,expect} from '@playwright/test';
test('Thai assessment: validation, review, cutoff, correction, print and reset',async({page},testInfo)=>{
 const errors:string[]=[];const requests:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto('./'); await expect(page).toHaveTitle(/PSQI/);
 await page.getByRole('button',{name:/เริ่มทำแบบประเมิน/}).click();
 await page.getByRole('button',{name:/ถัดไป/}).click();await expect(page.getByRole('alert')).toBeVisible();
 await page.getByLabel('1) เวลาที่มักเข้านอน',{exact:true}).fill('23:00');
 await page.getByLabel('2) เวลาที่ใช้หลับ (นาที)',{exact:true}).fill('10');
 await page.getByLabel('3) เวลาที่มักตื่น',{exact:true}).fill('07:00');
 await page.getByLabel('4) เวลาที่หลับจริง (ชั่วโมงต่อคืน)',{exact:true}).fill('8');
 await page.getByRole('button',{name:/ถัดไป/}).click();
 for(let step=0;step<2;step++){for(const group of await page.locator('fieldset').all()){if(!(await group.getAttribute('id'))?.endsWith('q5j'))await group.getByRole('radio').first().check();}await page.getByRole('button',{name:/ถัดไป/}).click();}
 const groups=page.locator('fieldset');await groups.nth(0).getByRole('radio').nth(3).check();await groups.nth(1).getByRole('radio').first().check();await groups.nth(2).getByRole('radio').first().check();await groups.nth(3).getByRole('radio').nth(2).check();
 await page.getByRole('button',{name:/ถัดไป/}).click();await page.getByRole('button',{name:'คำนวณผลประเมิน'}).click();
 await expect(page.locator('.score')).toHaveText('5 / 21');await expect(page.getByRole('heading',{name:'คุณภาพการนอนหลับดี',exact:true})).toBeVisible();
 await page.screenshot({path:`../${testInfo.project.name}-result.png`,fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.emulateMedia({media:'print'});await expect(page.getByRole('button',{name:'พิมพ์ / บันทึก PDF'})).toBeHidden();await page.emulateMedia({media:'screen'});
 await page.getByRole('button',{name:'แก้ไขคำตอบ'}).click();await page.getByRole('button',{name:'แก้ไข',exact:true}).last().click();await page.locator('fieldset').last().getByRole('radio').nth(3).check();await page.getByRole('button',{name:/ถัดไป/}).click();await page.getByRole('button',{name:'คำนวณผลประเมิน'}).click();await expect(page.locator('.score')).toHaveText('6 / 21');await expect(page.getByRole('heading',{name:'คุณภาพการนอนหลับไม่ดี',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});expect(requests.every(u=>u.startsWith('http://127.0.0.1:5173/'))).toBe(true);expect(errors).toEqual([]);
 await page.getByRole('button',{name:'เริ่มทำแบบประเมินใหม่'}).click();await page.getByRole('button',{name:'ยืนยันล้างคำตอบ'}).click();await page.getByRole('button',{name:/เริ่มทำแบบประเมิน/}).click();await expect(page.getByLabel('1) เวลาที่มักเข้านอน',{exact:true})).toHaveValue('');
});
