# 📚 PSU-Reshub
> Academic Research Dashboard สำหรับวิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต  
> ระบบแสดงผลงานทางวิชาการของอาจารย์ โดยดึงข้อมูลจาก Google Sheets แบบ Real-time

> ตัวอย่าง Website : https://psu-reshub.vercel.app/

##⚠️ กรณีโหลดโค๊ดมาใช้ครั้งแรก ให้ไปแก้ไข .env.local อัพเดทใส่ลิ้ง google sheet ก่อน (ในส่วน vscode)
## กรณีทำต่อใน vercel กรุณาอ่านรายละเอียดด้านล่าง

---

## 📋 สารบัญ
- [🎯 ภาพรวมโปรเจกต์](#-ภาพรวมโปรเจกต์)
- [⚙️ ความต้องการของระบบ](#️-ความต้องการของระบบ)
- [🚀 การติดตั้งครั้งแรก](#-การติดตั้งครั้งแรก)
- [💻 การรันโปรแกรมใน VSCode](#-การรันโปรแกรมใน-vscode)
- [📊 การเปลี่ยน Google Sheet](#-การเปลี่ยน-google-sheet)
- [☁️ การ Deploy ขึ้น Vercel](#️-การdeploy-ขึ้น-vercel)
- [📁 โครงสร้างไฟล์สำคัญ](#-โครงสร้างไฟล์สำคัญ)
- [🔧 การแก้ไขปัญหาที่พบบ่อย](#-การแก้ไขปัญหาที่พบบ่อย)
- [📞 ติดต่อ / สอบถาม](#-ติดต่อ--สอบถาม)

---

## 🎯 ภาพรวมโปรเจกต์
**PSU-Reshub** เป็นเว็บแอปพลิเคชันที่สร้างขึ้นเพื่อให้ใช้งานและต่อยอดได้ง่าย โดยมีฟีเจอร์หลัก:
* 📊 **แดชบอร์ดแสดงผลงานวิชาการ:** ของอาจารย์วิทยาลัยการคอมพิวเตอร์
* 🔍 **ระบบค้นหาและกรองข้อมูล:** ตามชื่ออาจารย์, ช่วงปี, และประเภทผลงาน
* 📈 **กราฟแท่ง (Bar Chart):** แสดงจำนวนผลงานในแต่ละปี แยกตามประเภทหรือ Indexing
* 🥧 **กราฟวงกลม (Pie Chart):** แสดงสัดส่วนฐานข้อมูล (Indexing)
* 📋 **ตารางรายการผลงาน:** พร้อมปุ่ม Export เป็นไฟล์ CSV
* 🎨 **Dark Mode:** ธีมสีน้ำเงิน-ฟ้า ดูทันสมัย

### 🛠️ เทคโนโลยีที่ใช้
* **Next.js 14** (App Router)
* **React 18**
* **Tailwind CSS**
* **Recharts** (สำหรับแสดงกราฟ)
* **PapaParse** (สำหรับอ่านไฟล์ CSV)

---

## ⚙️ ความต้องการของระบบ
ก่อนเริ่มใช้งาน จำเป็นต้องติดตั้งโปรแกรมเหล่านี้บนเครื่องคอมพิวเตอร์:

| โปรแกรม | เวอร์ชันขั้นต่ำ | ลิงก์ดาวน์โหลด / รายละเอียด |
| :--- | :--- | :--- |
| **Node.js** | `18.17.0` ขึ้นไป | [nodejs.org](https://nodejs.org/) |
| **npm** | มาพร้อมกับ Node.js | — |
| **Git** | เวอร์ชันล่าสุด | [git-scm.com](https://git-scm.com/) |
| **VSCode** | เวอร์ชันล่าสุด | [code.visualstudio.com](https://code.visualstudio.com/) |

## 📊 การเปลี่ยน Google Sheet
ใช้เมื่อ: ต้องการเปลี่ยนไปใช้ Google Sheet อันใหม่ หรืออัปเดตโครงสร้างข้อมูล

## ⚠️ สิ่งสำคัญ: หัวคอลัมน์ต้องตรงเป๊ะ
ไฟล์ Google Sheet ต้องกำหนดชื่อหัวคอลัมน์ (Header Row) ใน แถวที่ 1 ตามนี้ทุกตัวอักษร (คำนึงถึงตัวพิมพ์เล็ก-ใหญ่ และห้ามเว้นวรรค):
ชื่อหัวข้อ (Header) : Staff name , Type , Detail ,  Month ,  Year ,  Indexing ,  Is the author's affiliation with PSU?

## กรณีเปลี่ยนลิ้ง google sheet
ให้เปลี่ยนในไฟล์ .env.local และนำลิ้งใหม่ไปเปลี่ยนแทน

## ☁️ การ Deploy ขึ้น Vercel
สำหรับการ Deploy ครั้งแรก
Push โค้ดโปรเจกต์ขึ้น GitHub ของคุณ

เข้าเว็บไซต์ vercel.com → เลือก Add New Project

เลือก Repository ที่ต้องการเชื่อมต่อ

ในส่วน Environment Variables ให้เพิ่มค่า:

Key: NEXT_PUBLIC_GOOGLE_SHEET_URL

Value: ลิงก์ CSV จาก Google Sheet

Type: เลือก Config (ไม่ใช่ Secret)

Environments: เลือกทั้งหมด (Production, Preview, Development)

กด Deploy

## การอัปเดตครั้งต่อๆ ไป
กรณีแก้โค้ดโปรเจกต์: ระบบ Vercel จะทำการ Deploy ให้อัตโนมัติทุกครั้งที่คุณ Push ขึ้น GitHub

กรณีเปลี่ยนลิงก์ Google Sheet (Environment Variable):

ต้องทำการ Redeploy ทุกครั้ง มิฉะนั้นข้อมูลจะไม่เปลี่ยนตาม

ไปที่ Vercel Dashboard → เลือกโปรเจกต์ของคุณ

ไปที่แท็บ Deployments → คลิกปุ่ม ... ที่ Deployment ล่าสุด

เลือก Redeploy รอ 1-2 นาทีเป็นอันเสร็จสิ้น


**ตรวจสอบเวอร์ชันใน Terminal:**
```bash
node -v    # ควรได้ v18.17.0 ขึ้นไป
npm -v     # ควรได้ 9.0.0 ขึ้นไป
🚀 การติดตั้งครั้งแรกใช้สำหรับ: โหลดโปรเจกต์มาใหม่จาก Git หรือคัดลอกโฟลเดอร์มาจากเครื่องอื่นขั้นตอนที่ 1: เปิดโฟลเดอร์โปรเจกต์ใน VSCodeเปิดโปรแกรม VSCodeไปที่เมนู File → Open Folder...เลือกโฟลเดอร์ PSU-Reshub-mainขั้นตอนที่ 2: เปิด Terminal ใน VSCodeกดปุ่ม Ctrl + ~ (Control + ปุ่มตัวหนอน) บนคีย์บอร์ดหรือไปที่เมนูด้านบน Terminal → New Terminalขั้นตอนที่ 3: ติดตั้ง Dependenciesรันคำสั่งเพื่อติดตั้งไลบรารีที่จำเป็น:Bashnpm install
⏳ รอประมาณ 1-2 นาที ระบบจะดาวน์โหลดไฟล์ทั้งหมดลงในโฟลเดอร์ node_modulesขั้นตอนที่ 4: ตรวจสอบและสร้างไฟล์ .env.localสร้างไฟล์ชื่อ .env.local ไว้ที่โฟลเดอร์หลักของโปรเจกต์ (ถ้ายังไม่มี) แล้วใส่ค่าดังนี้:ข้อมูลโค้ดNEXT_PUBLIC_GOOGLE_SHEET_URL=[https://docs.google.com/spreadsheets/d/1AwXk3ZVp1LWymvzH6Kp_wGVEBkgIQCAp_rQikMQITxU/export?format=csv](https://docs.google.com/spreadsheets/d/1AwXk3ZVp1LWymvzH6Kp_wGVEBkgIQCAp_rQikMQITxU/export?format=csv)
📌 หมายเหตุ: ไฟล์นี้มีข้อมูลสำคัญ (Sensitive) ระบบจะไม่นำขึ้น Git ต้องสร้างใหม่ทุกครั้งที่ย้ายเครื่อง💻 การรันโปรแกรมใน VSCode1. เปิด Development Serverพิมพ์คำสั่งนี้ใน Terminal ของ VSCode:Bashnpm run dev
หากสำเร็จ จะแสดงข้อความลักษณะนี้:Plaintext▲ Next.js 14.2.35
- Local:        http://localhost:3000
- Network:      [http://192.168.](http://192.168.)x.x:3000

✓ Ready in 2.5s
2. เปิดเว็บดูผลลัพธ์เปิดเว็บเบราว์เซอร์ (Chrome, Edge, Firefox)พิมพ์ URL: http://localhost:3000 (หรือกด Ctrl ค้างไว้แล้วคลิกลิงก์ใน Terminal)จะพบหน้าแดชบอร์ด PSU-Reshub พร้อมข้อมูลดึงจาก Google Sheet ทันที3. การหยุดการทำงานกดปุ่ม Ctrl + C ใน Terminal เพื่อหยุด Serverหรือปิดหน้าต่าง Terminal / VSCode ได้เลย📋 สรุปคำสั่งที่มีประโยชน์คำสั่งหน้าที่การทำงานnpm run devรันโหมด Development (แก้ไขโค้ดแล้วแสดงผลทันที)npm run buildสร้าง Production Build สำหรับตรวจสอบก่อน Deploynpm startรันตัว Production Build (ต้องรัน npm run build ก่อน)npm run lintตรวจสอบข้อผิดพลาดของโครงสร้างโค้ด📊 การเปลี่ยน Google Sheetใช้เมื่อ: ต้องการเปลี่ยนไปใช้ Google Sheet อันใหม่ หรืออัปเดตโครงสร้างข้อมูล⚠️ สิ่งสำคัญ: หัวคอลัมน์ต้องตรงเป๊ะไฟล์ Google Sheet ต้องกำหนดชื่อหัวคอลัมน์ (Header Row) ใน แถวที่ 1 ตามนี้ทุกตัวอักษร (คำนึงถึงตัวพิมพ์เล็ก-ใหญ่ และห้ามเว้นวรรค):คอลัมน์ชื่อหัวข้อ (Header)ตัวอย่างข้อมูลคำอธิบายAStaff nameสมชาย ใจดีชื่อ-นามสกุลอาจารย์BTypeInternational Journal ArticlesประเภทผลงานCDetailTitle of paper...รายละเอียดผลงานDMonthJanuaryเดือนที่ตีพิมพ์EYear2024ปี ค.ศ. ที่ตีพิมพ์FIndexingScopusฐานข้อมูลที่จัดอันดับGIs the author's affiliation with PSU?Y หรือ Nสังกัด ม.อ. หรือไม่ขั้นตอนการตั้งค่า Google Sheet ใหม่:สร้างและกรอกข้อมูล: สร้าง Spreadsheet ใหม่ กรอกหัวข้อที่แถว 1 และใส่ข้อมูลตั้งแต่แถว 2 เป็นต้นไป (คอลัมน์ Year แนะนำให้ใส่เป็นปี ค.ศ.)ตั้งค่าสิทธิ์การเข้าถึง:คลิกปุ่ม Share (มุมขวาบน)เปลี่ยนจาก Restricted เป็น Anyone with the linkกำหนดสิทธิ์เป็น Viewer แล้วกด DonePublish to the Web (เพื่อดึงลิงก์ CSV):ไปที่เมนู File → Share → Publish to the webเลือก Sheet ที่ต้องการเผยแพร่เปลี่ยนรูปแบบไฟล์เป็น Comma-separated values (.csv)กด Publish แล้วคัดลอกลิงก์ที่ได้นำลิงก์ไปใส่ในโปรเจกต์:เปิดไฟล์ .env.local ใน VSCodeวางลิงก์ CSV ที่คัดลอกมาหลังเครื่องหมาย =รีสตาร์ท Server (Ctrl + C แล้วพิมพ์ npm run dev ใหม่)☁️ การ Deploy ขึ้น Vercelสำหรับการ Deploy ครั้งแรกPush โค้ดโปรเจกต์ขึ้น GitHub ของคุณเข้าเว็บไซต์ vercel.com → เลือก Add New Projectเลือก Repository ที่ต้องการเชื่อมต่อในส่วน Environment Variables ให้เพิ่มค่า:Key: NEXT_PUBLIC_GOOGLE_SHEET_URLValue: ลิงก์ CSV จาก Google SheetEnvironments: เลือกทั้งหมด (Production, Preview, Development)กด Deployการอัปเดตครั้งต่อๆ ไปกรณีแก้โค้ดโปรเจกต์: ระบบ Vercel จะทำการ Deploy ให้อัตโนมัติทุกครั้งที่คุณ Push ขึ้น GitHubกรณีเปลี่ยนลิงก์ Google Sheet (Environment Variable):ต้องทำการ Redeploy ทุกครั้ง มิฉะนั้นข้อมูลจะไม่เปลี่ยนตามไปที่ Vercel Dashboard → เลือกโปรเจกต์ของคุณไปที่แท็บ Deployments → คลิกปุ่ม ... ที่ Deployment ล่าสุดเลือก Redeploy รอ 1-2 นาทีเป็นอันเสร็จสิ้น📁 โครงสร้างไฟล์สำคัญPlaintextPSU-Reshub-main/
├── app/                        # โฟลเดอร์ระบบ Next.js App Router
│   ├── globals.css             # สไตล์หลักของเว็บ (Tailwind CSS)
│   ├── layout.js               # โครงร่างหน้าเว็บ (Header/Footer)
│   └── page.js                 # หน้าแรกของเว็บไซต์
├── components/
│   └── ResearchDashboard.jsx   # คอมพิวเตอร์หลักของแดชบอร์ด (กราฟและตาราง)
├── lib/
│   └── fetchResearchData.js    # ฟังก์ชันดึงและแปลงข้อมูลจาก Google Sheet
├── .env.local                  # ไฟล์เก็บตัวแปรลับ (ห้ามอัปขึ้น GitHub)
├── package.json                # รายการแพ็กเกจ Dependencies ทั้งหมด
└── tailwind.config.js          # ไฟล์ตั้งค่า Tailwind CSS
🔧 การแก้ไขปัญหาที่พบบ่อย❌ ปัญหา: รัน npm install แล้วขึ้น Error / ไม่ผ่านสาเหตุ: เวอร์ชัน Node.js ในเครื่องเก่าเกินไปวิธีแก้: อัปเดต Node.js เป็นเวอร์ชัน 18.17.0 ขึ้นไป จากนั้นลบโฟลเดอร์ node_modules และไฟล์ package-lock.json แล้วรัน npm install ใหม่อีกครั้ง❌ ปัญหา: เปิดเว็บใน Localhost แล้วข้อมูลไม่ออกสาเหตุ: ลิงก์ Google Sheet ผิด หรือไม่มีไฟล์ .env.localวิธีแก้: ตรวจสอบไฟล์ .env.local ว่าลิงก์ถูกต้องและลงท้ายด้วยรูปแบบการส่งออก CSV หรือไม่ รวมถึงเช็คว่าตั้งค่าสิทธิ์เป็น Public หรือยัง❌ ปัญหา: Deploy บน Vercel แล้วข้อมูลไม่ขึ้นตามที่แก้สาเหตุ: ยังไม่ได้กด Redeploy หลังจากเปลี่ยน Environment Variableวิธีแก้: ไปที่หน้า Vercel Dashboard ของโปรเจกต์ → แท็บ Deployments → กด ... แล้วเลือก Redeploy❌ ปัญหา: กราฟไม่แสดงข้อมูล หรือข้อมูลปีเพี้ยนสาเหตุ: คอลัมน์ Year ใน Google Sheet ไม่ใช่ตัวเลข ค.ศ.วิธีแก้: ตรวจสอบว่าคอลัมน์ปีเป็นตัวเลข ค.ศ. (เช่น 2024) ไม่ใช่ พ.ศ. และตรวจสอบหัวคอลัมน์ให้ตรงตามตารางคู่มือเป๊ะๆ


