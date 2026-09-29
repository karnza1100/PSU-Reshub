📚 README — PSU-Reshub
Academic Research Dashboard สำหรับวิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต
ระบบแสดงผลงานทางวิชาการของอาจารย์ โดยดึงข้อมูลจาก Google Sheets แบบ Real-time

📋 สารบัญ
ภาพรวมโปรเจกต์

ความต้องการของระบบ

การติดตั้งครั้งแรก

การรันโปรแกรมใน VSCode

การเปลี่ยน Google Sheet

การ Deploy ขึ้น Vercel

โครงสร้างไฟล์สำคัญ

การแก้ไขปัญหาที่พบบ่อย

🎯 ภาพรวมโปรเจกต์
PSU-Reshub เป็นเว็บแอปพลิเคชันที่สร้างขึ้นเพื่อให้นำไปใช้ต่อได้ง่าย โดยมีฟีเจอร์หลัก:

📊 แดชบอร์ดแสดงผลงานวิชาการ ของอาจารย์วิทยาลัยการคอมพิวเตอร์

🔍 ค้นหา/กรองข้อมูล ตามชื่ออาจารย์, ช่วงปี, ประเภทผลงาน

📈 กราฟแท่ง (Bar Chart) แสดงจำนวนผลงานในแต่ละปี แยกตามประเภทหรือ Indexing

🥧 กราฟวงกลม (Pie Chart) แสดงสัดส่วนฐานข้อมูล (Indexing)

📋 ตารางรายการผลงาน พร้อมปุ่ม Export เป็น CSV

🎨 Dark Mode ธีมสีน้ำเงิน-ฟ้า ดูทันสมัย

เทคโนโลยีที่ใช้:

Next.js 14 (App Router)

React 18

Tailwind CSS

Recharts (กราฟ)

PapaParse (อ่าน CSV)

⚙️ ความต้องการของระบบ
ก่อนเริ่มใช้งาน ต้องติดตั้งโปรแกรมเหล่านี้ในเครื่องก่อน:

โปรแกรม	เวอร์ชันขั้นต่ำ	ดาวน์โหลด
Node.js	18.17.0 ขึ้นไป	nodejs.org
npm	มาพร้อมกับ Node.js	—
Git	เวอร์ชันล่าสุด	git-scm.com
VSCode	เวอร์ชันล่าสุด	code.visualstudio.com
ตรวจสอบเวอร์ชัน:

bash
node -v    # ควรได้ v18.17.0 ขึ้นไป
npm -v     # ควรได้ 9.0.0 ขึ้นไป
🚀 การติดตั้งครั้งแรก
ใช้เมื่อ: โหลดโปรเจกต์มาใหม่จาก Git หรือคัดลอกโฟลเดอร์มาจากเครื่องอื่น

ขั้นตอนที่ 1: เปิดโฟลเดอร์โปรเจกต์ใน VSCode
เปิด VSCode

ไปที่ File → Open Folder

เลือกโฟลเดอร์ PSU-Reshub-main

ขั้นตอนที่ 2: เปิด Terminal ใน VSCode
กด Ctrl + ~ (ปุ่ม control + ปุ่มตัวหนอน)

หรือไปที่ Terminal → New Terminal

ขั้นตอนที่ 3: ติดตั้ง dependencies
bash
npm install
⏳ รอประมาณ 1-2 นาที (หรือนานกว่านั้นถ้าอินเทอร์เน็ตช้า)
ระบบจะดาวน์โหลดไลบรารีทั้งหมดลงโฟลเดอร์ node_modules

ขั้นตอนที่ 4: ตรวจสอบไฟล์ .env.local
ตรวจสอบว่ามีไฟล์ .env.local อยู่ในโฟลเดอร์หลักหรือไม่ ถ้าไม่มี ให้สร้างใหม่และใส่ค่าดังนี้:

env
NEXT_PUBLIC_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/1AwXk3ZVp1LWymvzH6Kp_wGVEBkgIQCAp_rQikMQITxU/export?format=csv
📌 หมายเหตุ: ไฟล์นี้จะไม่ถูกอัปโหลดขึ้น Git เพราะมีข้อมูล Sensitive อยู่
ต้องสร้างใหม่ทุกครั้งที่โหลดโปรเจกต์มาเครื่องใหม่

💻 การรันโปรแกรมใน VSCode
เปิด Development Server
ใน Terminal ของ VSCode พิมพ์:

bash
npm run dev
ถ้าสำเร็จจะเห็นข้อความประมาณนี้:

text
▲ Next.js 14.2.35
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
เปิดเว็บดูผลลัพธ์
เปิดเบราว์เซอร์ (Chrome, Edge, Firefox)

พิมพ์ URL: http://localhost:3000

จะเห็นหน้าแดชบอร์ด PSU-Reshub พร้อมข้อมูลจาก Google Sheet

หยุดการทำงาน
กด Ctrl + C ใน Terminal เพื่อหยุด server

หรือปิด VSCode ไปเลย

คำสั่งอื่นๆ ที่มีให้ใช้
คำสั่ง	หน้าที่
npm run dev	รันโหมด Development (แก้โค้ดแล้วเห็นผลทันที)
npm run build	สร้าง Production Build (สำหรับทดสอบก่อน Deploy)
npm start	รัน Production Build (ต้อง npm run build ก่อน)
npm run lint	ตรวจสอบโค้ดว่ามีข้อผิดพลาดไหม
📊 การเปลี่ยน Google Sheet
ใช้เมื่อ: อาจารย์ต้องการเปลี่ยนไปใช้ Google Sheet อันใหม่ หรืออัปเดตข้อมูล

✅ สิ่งสำคัญที่สุด: หัวคอลัมน์ต้องตรงกัน
ไฟล์ Google Sheet ที่ใช้จะต้องมี หัวคอลัมน์ (Header Row) ตามนี้ เป๊ะๆ (ตัวพิมพ์เล็ก-ใหญ่ และเว้นวรรคต้องตรง):

คอลัมน์	ชื่อหัวข้อ (ต้องตรงเป๊ะ)	ตัวอย่างข้อมูล	คำอธิบาย
A	Staff name	สมชาย ใจดี	ชื่อ-นามสกุลอาจารย์
B	Type	International Journal Articles	ประเภทผลงาน
C	Detail	Title of paper...	รายละเอียดผลงาน
D	Month	January	เดือนที่ตีพิมพ์
E	Year	2024	ปี ค.ศ. ที่ตีพิมพ์
F	Indexing	Scopus	ฐานข้อมูลที่ถูกจัดอันดับ
G	Is the author's affiliation with PSU?	Y หรือ N	สังกัด ม.อ. หรือไม่
⚠️ คำเตือน:

หัวข้อต้องอยู่ที่ แถวแรก (Row 1) ของ Sheet

ตัวอักษรต้องตรงเป๊ะ เช่น Staff name (ไม่ใช่ Staff Name หรือ staff name)

ห้ามเว้นวรรคหน้า-หลัง ชื่อคอลัมน์

ลำดับคอลัมน์สามารถสลับกันได้ แต่ ชื่อต้องตรง

ขั้นตอนที่ 1: สร้าง Google Sheet ใหม่
เปิด Google Sheets

สร้าง Spreadsheet ใหม่

ตั้งชื่อไฟล์ตามต้องการ เช่น Publications CV-10-2025

กรอกข้อมูลโดยให้ แถวแรกเป็นหัวคอลัมน์ ตามตารางด้านบน

เริ่มกรอกข้อมูลตั้งแต่ แถวที่ 2 เป็นต้นไป

ขั้นตอนที่ 2: แชร์ให้เป็น Public
กดปุ่ม Share (มุมขวาบน)

ในส่วน General access → เปลี่ยนจาก "Restricted" เป็น "Anyone with the link"

ตั้งสิทธิ์เป็น Viewer

กด Done

ขั้นตอนที่ 3: Publish to the Web (เพื่อให้ได้ลิงก์ CSV)
ไปที่เมนู File → Share → Publish to the web

ในหน้าต่างที่เด้งขึ้นมา:

เลือก Sheet ที่ต้องการเผยแพร่

เลือกรูปแบบเป็น Comma-separated values (.csv)

กดปุ่ม Publish

คัดลอกลิงก์ที่ได้ → จะมีหน้าตาแบบนี้:

text
https://docs.google.com/spreadsheets/d/e/2PACX-1vRkvhUsgdcXpXaMV0hsAZgqSi0rWsNSEqN_JTOQ1Ble1XTSWVBnHOsy6RzouLPfK04zKRCsiN459laZ/pub?output=csv
ขั้นตอนที่ 4: นำลิงก์ไปใส่ในไฟล์ .env.local
เปิดไฟล์ .env.local ใน VSCode แล้วแก้ไขบรรทัดนี้:

env
NEXT_PUBLIC_GOOGLE_SHEET_URL=ใส่ลิงก์ CSV ที่คัดลอกมาที่นี่
ตัวอย่าง:

env
NEXT_PUBLIC_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vRkvhUsgdcXpXaMV0hsAZgqSi0rWsNSEqN_JTOQ1Ble1XTSWVBnHOsy6RzouLPfK04zKRCsiN459laZ/pub?output=csv
ขั้นตอนที่ 5: รีสตาร์ท Server
กด Ctrl + C ใน Terminal เพื่อหยุด server

รันใหม่ด้วยคำสั่ง npm run dev

เปิดเว็บดูอีกครั้ง ข้อมูลใหม่จะขึ้นมา

(ถ้า Deploy บน Vercel แล้ว) อัปเดตค่า Environment Variable
ไปที่ Vercel Dashboard → โปรเจกต์ → Settings → Environment Variables

หาตัวแปร NEXT_PUBLIC_GOOGLE_SHEET_URL → กด ... → Edit

วางลิงก์ CSV ใหม่ → กด Save

ไปที่แท็บ Deployments → กด ... ที่ Deployment ล่าสุด → Redeploy

รอ 1-2 นาที แล้วเปิดเว็บดู

☁️ การ Deploy ขึ้น Vercel
ครั้งแรก
Push โค้ดขึ้น GitHub

ไปที่ vercel.com → Add New Project

เลือก Repository ที่ต้องการ

ในส่วน Environment Variables ให้เพิ่ม:

Key: NEXT_PUBLIC_GOOGLE_SHEET_URL

Value: ลิงก์ CSV จาก Google Sheet

Type: Config

Environments: เลือกทั้งหมด (Production, Preview, Development)

กด Deploy

ครั้งต่อไป (เมื่อแก้โค้ด)
Vercel จะ Deploy อัตโนมัติทุกครั้งที่ Push ขึ้น GitHub

เมื่อแก้เฉพาะ Environment Variable
ต้อง Redeploy ทุกครั้ง เพราะค่าใหม่จะไม่มีผลกับ Deployment เก่า:

ไปที่ Deployments → กด ... ที่ Deployment ล่าสุด → Redeploy

📁 โครงสร้างไฟล์สำคัญ
text
PSU-Reshub-main/
├── app/                          # โฟลเดอร์ App Router
│   ├── globals.css               # สไตล์ Global (Tailwind)
│   ├── layout.js                 # Layout หลัก (Header/Footer)
│   └── page.js                   # หน้าแรก
├── components/
│   └── ResearchDashboard.jsx     # Component หลักของแดชบอร์ด
├── lib/
│   └── fetchResearchData.js      # ฟังก์ชันดึงข้อมูลจาก Google Sheet
├── .env.local                    # ตัวแปร Environment (ไม่ขึ้น Git)
├── package.json                  # รายการ dependencies
├── postcss.config.js             # ตั้งค่า PostCSS
└── tailwind.config.js            # ตั้งค่า Tailwind CSS
ไฟล์ที่อาจารย์อาจต้องแก้บ่อย:

.env.local → เปลี่ยนลิงก์ Google Sheet

components/ResearchDashboard.jsx → ปรับ UI, เพิ่มฟีเจอร์

app/layout.js → เปลี่ยน Title, Metadata ของเว็บ

🔧 การแก้ไขปัญหาที่พบบ่อย
❌ ปัญหา: npm install ไม่ผ่าน
สาเหตุ: Node.js เวอร์ชันเก่าเกินไป
วิธีแก้: อัปเดต Node.js เป็น 18.17.0 ขึ้นไป → ลบโฟลเดอร์ node_modules และไฟล์ package-lock.json → รัน npm install ใหม่

❌ ปัญหา: เปิดเว็บแล้วข้อมูลไม่ขึ้น (localhost)
สาเหตุ: ลิงก์ Google Sheet ผิด หรือไฟล์ .env.local หาย
วิธีแก้:

ตรวจสอบว่ามีไฟล์ .env.local หรือไม่

ตรวจสอบว่าลิงก์ในไฟล์ขึ้นต้นด้วย https://docs.google.com/spreadsheets/d/e/...

ลองเปิดลิงก์ในโหมด Incognito → ถ้าเห็นหน้า Login แสดงว่ายังไม่ Public

รีสตาร์ท server (Ctrl + C แล้ว npm run dev ใหม่)

❌ ปัญหา: Deploy บน Vercel แล้วข้อมูลไม่ขึ้น
สาเหตุ: Environment Variable ผิด หรือยังไม่ Redeploy
วิธีแก้:

ไปที่ Vercel → Settings → Environment Variables

ตรวจสอบค่า NEXT_PUBLIC_GOOGLE_SHEET_URL

ตรวจสอบ Type ว่าเป็น Config (ไม่ใช่ Secret)

กด Redeploy ที่ Deployment ล่าสุด

❌ ปัญหา: ข้อมูลขึ้นแต่หัวคอลัมน์เพี้ยน
สาเหตุ: ชื่อหัวคอลัมน์ใน Google Sheet ไม่ตรงกับที่โค้ดกำหนด
วิธีแก้:

เปิดไฟล์ Google Sheet → ตรวจสอบว่าหัวคอลัมน์ตรงกับตารางในหัวข้อ การเปลี่ยน Google Sheet เป๊ะๆ

ระวังตัวพิมพ์เล็ก-ใหญ่ และช่องว่าง

❌ ปัญหา: กราฟไม่แสดงข้อมูล
สาเหตุ: ไม่มีข้อมูลในช่วงปีที่เลือก หรือคอลัมน์ Year ไม่ใช่ตัวเลข
วิธีแก้:

ตรวจสอบว่าคอลัมน์ Year เป็นตัวเลข (ค.ศ.) ไม่ใช่ พ.ศ.

ลองขยายช่วงปี (startYear - endYear) ให้กว้างขึ้น

❌ ปัญหา: next: command not found
สาเหตุ: ยังไม่ได้รัน npm install
วิธีแก้: รัน npm install ก่อน แล้วค่อย npm run dev

📞 ติดต่อ / สอบถาม
หากพบปัญหาที่ไม่สามารถแก้ไขได้เอง กรุณาติดต่อ:

หน่วยงาน: วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต

ผู้พัฒนา: [ใส่ชื่อผู้พัฒนา]

อีเมล: [ใส่ email]

📄 License
โปรเจกต์นี้สร้างขึ้นเพื่อใช้งานภายในวิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต

✅ หมายเหตุ: README นี้เขียนขึ้นเพื่อให้อาจารย์ที่ไม่ได้มีพื้นฐานด้านโปรแกรมมิ่งมาก่อน สามารถนำไปใช้ต่อได้ หากมีข้อสงสัยเพิ่มเติมสามารถสอบถามผู้พัฒนาได้เลยครับ
