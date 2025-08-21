# AllerGuard 📱  
**Smart Allergen Detection & Warning App**

AllerGuard is a mobile application that helps users manage food allergies by scanning product barcodes and instantly checking allergen information.  
Users can save their personal allergens, receive real-time warnings, and access detailed allergen information to make safer shopping decisions.

---

## 📌 Table of Contents  
- [About the Project](#-about-the-project)  
- [Features](#-features)  
- [Technologies Used](#-technologies-used)  
- [Installation](#-installation)  
- [How It Works](#-how-it-works)  
- [Screenshots](#-screenshots)  
- [Testing & Security](#-testing--security)  
- [Contact](#-contact)

---

## 🧩 About the Project  

AllerGuard was developed to make grocery shopping safer and easier for people with food allergies.  
By scanning a product barcode, users can immediately access allergen information without having to manually read labels.

**Key Objectives**  
- Provide an **instant allergen detection** system  
- Enable **personal allergen management**  
- Prevent **anaphylactic reactions** with early warnings  
- Offer **educational resources** through FAQs and news updates  

---

## 🚀 Features  

- **Barcode Scanning** → Instantly check product allergen information  
- **Personalized Allergen Management** → Add, edit, and manage allergens  
- **Real-Time Warnings** → Get instant alerts when a scanned product contains allergens  
- **Detailed Allergen Info** → Access comprehensive allergen details and FAQs  
- **Educational Resources** → Stay updated with trusted food allergy news  
- **User Profiles** → Manage your account, saved allergens, and preferences  
- **Secure Authentication** → Firebase-based login, signup, and guest mode  

---

## 🛠️ Technologies Used  

- **Framework:** Ionic + Angular  
- **Backend & Database:** Firebase Firestore  
- **Authentication:** Firebase Auth  
- **API Integration:** [OpenFoodFacts API](https://world.openfoodfacts.org/)  
    - Used to retrieve **real-time product and allergen information** by scanning barcodes.  
    - If a scanned product contains allergens matching the user profile, the app triggers an **instant warning**.  
- **IDE:** Visual Studio Code  
- **Version Control:** Git & GitHub  

---

## ⚡ Installation  

```bash
# Clone the repository
git clone https://github.com/your-username/AllerGuard.git

# Navigate to the project folder
cd AllerGuard

# Install dependencies
npm install

# Configure Firebase
# Update environment.ts with your Firebase credentials

# Run the app
ionic serve

🔄 How It Works
	1.	Sign Up or Sign In – Create an account or continue as a guest.
	2.	Add Allergens – Save allergens you want to avoid.
	3.	Scan Barcode – Use the camera to scan a product barcode.
	4.	Fetch Data from OpenFoodFacts API –
The app automatically requests allergen and product information from the OpenFoodFacts API.
	5.	Get Warnings – Instantly know if the product contains allergens matching your profile.
	6.	Read News & FAQs – Stay informed with trusted allergy-related resources.
