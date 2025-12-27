# 1️⃣ getPatientProfile

Kaise kaam karta hai:

Patient login karta hai → JWT me userId + role=patient

Auth middleware → req.user = { id, role }

Patient model me userId = req.user.id se data fetch

Patient apna:

age

gender

blood group

emergency contact
dekh sakta hai

👉 Patient sirf apna hi profile dekh sakta hai

# 2️⃣ updatePatientProfile

Flow:

Patient dashboard se form submit karta hai

Zod validation (age, blood group, etc.)

Patient collection me update by userId

Success response

👉 Doctor / staff is route ko access nahi kar sakta

# 3️⃣ getMyAppointments

Flow:

Patient login

Appointment collection me:

patientId = patient._id

List return:

pending

accepted

completed

cancelled

👉 Patient sirf apne appointments dekhta hai

# 4️⃣ bookAppointment

Real-world logic:

Patient doctor select karta hai

Available slots fetch hote hain

Patient slot choose karta hai

Backend check:

slot free hai?

doctor active hai?

Appointment create:

status = pending

createdBy = patient

Slot → isBooked = true

👉 Doctor ko notification jata hai

# 5️⃣ cancelAppointment

Flow:

Patient sirf:

pending appointment cancel kar sakta hai

Appointment status → cancelled

Slot free ho jata hai (isBooked=false)

👉 Accepted / completed appointment cancel nahi

# 6️⃣ getPrescriptions

Flow:

Patient apni ID se prescriptions fetch karta hai

Sirf wahi prescriptions milte hain:

jo us patient ke liye bane ho

👉 Security: patient dusre patient ka data nahi dekh sakta

# 7️⃣ getMedicalReports

Flow:

Same logic as prescriptions

Reports sirf read-only

👨‍⚕️ DOCTOR CONTROLLER – FLOW EXPLANATION

Doctor = User(role=doctor) + Doctor profile

# 1️⃣ getTodayAppointments

Flow:

Doctor login

Doctor model me userId se doctorId nikalo

Appointment fetch:

doctorId

date = today

status = pending | accepted

👉 Doctor sirf apne appointments dekhega

# 2️⃣ acceptAppointment

Flow:

Doctor appointment accept karta hai

Backend check:

appointment doctor ka hai?

status = pending?

Status update → accepted

👉 Patient ko notification

# 3️⃣ rejectAppointment

Flow:

Same check as accept

Status → cancelled

Slot free ho jata hai

# 4️⃣ getPatientHistory

Flow:

Doctor appointment ke through patientId leta hai

Fetch:

past appointments

prescriptions

Only assigned patients ka data

👉 Doctor random patient ka history nahi dekh sakta

# 5️⃣ addPrescription

Flow:

Doctor prescription add karta hai

Check:

appointment accepted hai?

doctor assigned hai?

Prescription save

Appointment → completed

👉 Patient dashboard me show hoga

# 6️⃣ setAvailability

Flow:

Doctor apna availability set karta hai

Slots create hote hain

Duplicate slot block (unique index)

👉 Patient isi slot pe appointment book karega

# 7️⃣ chatWithPatient

Flow:

Doctor sirf:

accepted appointment wale patient se chat kar sakta hai

Chat mapping:

doctorId ↔ patientId ↔ appointmentId

👉 Random patient se chat ❌

# 8️⃣ chatWithManagement

Flow:

Doctor ↔ management internal chat

No patient access