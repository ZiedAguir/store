# Guide de Déploiement sur Render

## ✅ Problèmes Résolus

### 1. **Vulnérabilités de sécurité**
- ✅ Backend : 0 vulnérabilités (corrigées)
- ⚠️ Frontend : 2 vulnérabilités modérées (esbuild/vite)

### 2. **Configuration Render**
- ✅ Fichier `render.yaml` créé
- ✅ Configuration pour backend et frontend
- ✅ Variables d'environnement configurées

## 🚀 Étapes de Déploiement

### **1. Préparer votre Repository**

```bash
# Commiter les changements
git add .
git commit -m "Fix security vulnerabilities and add deployment config"
git push origin main
```

### **2. Configurer Render**

1. **Aller sur [Render.com](https://render.com)**
2. **Connecter votre GitHub**
3. **Créer 2 services :**

#### **Backend Service :**
- **Type :** Web Service
- **Build Command :** `cd backstore && npm install`
- **Start Command :** `cd backstore && npm run start:prod`
- **Node Version :** 22.16.0

#### **Frontend Service :**
- **Type :** Static Site
- **Build Command :** `cd frontstore && npm install && npm run build`
- **Publish Directory :** `frontstore/dist`

### **3. Variables d'Environnement**

#### **Backend (.env) :**
```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://votre-frontend.onrender.com

# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/store

# JWT
JWT_SECRET=votre-super-secret-jwt
JWT_EXPIRE=90d
JWT_COOKIE_EXPIRE=90

# Email
EMAIL_FROM=noreply@store.com
EMAIL_USERNAME=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Cloudinary
CLOUDINARY_CLOUD_NAME=votre-cloudinary-name
CLOUDINARY_API_KEY=votre-cloudinary-key
CLOUDINARY_API_SECRET=votre-cloudinary-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_votre-stripe-secret
STRIPE_WEBHOOK_SECRET=whsec_votre-webhook-secret
```

#### **Frontend (.env) :**
```env
VITE_API_URL=https://votre-backend.onrender.com/api/v1
VITE_CLIENT_URL=https://votre-frontend.onrender.com

# Firebase
VITE_FIREBASE_API_KEY=votre-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=votre-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-project-id
VITE_FIREBASE_STORAGE_BUCKET=votre-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=votre-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### **4. Base de Données**

**Option 1 : MongoDB Atlas (Recommandé)**
1. Créer un compte sur [MongoDB Atlas](https://cloud.mongodb.com)
2. Créer un cluster gratuit
3. Obtenir la connection string
4. L'ajouter à `DATABASE_URL`

**Option 2 : Render Database**
1. Dans Render, créer une base de données
2. Utiliser la connection string fournie

### **5. Services Externes**

#### **Cloudinary (Images) :**
1. Créer un compte sur [Cloudinary](https://cloudinary.com)
2. Obtenir les clés API
3. Les ajouter aux variables d'environnement

#### **Stripe (Paiements) :**
1. Créer un compte sur [Stripe](https://stripe.com)
2. Obtenir les clés API
3. Configurer les webhooks

#### **Firebase (Frontend) :**
1. Créer un projet sur [Firebase Console](https://console.firebase.google.com)
2. Obtenir la configuration
3. L'ajouter aux variables d'environnement

## 🔧 Configuration du Backend

### **Scripts de Production**

Vérifiez que `backstore/package.json` a :
```json
{
  "scripts": {
    "start:prod": "NODE_ENV=production node server.js"
  }
}
```

### **CORS Configuration**

Dans `backstore/server.js`, assurez-vous que :
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL, // URL de votre frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
```

## 🎯 Déploiement Final

1. **Push du code :**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Déployer sur Render :**
   - Le backend se déploiera automatiquement
   - Le frontend se déploiera automatiquement

3. **Tester :**
   - Backend : `https://votre-backend.onrender.com/ping`
   - Frontend : `https://votre-frontend.onrender.com`

## 🚨 Problèmes Courants

### **Build Failures :**
- Vérifiez les variables d'environnement
- Vérifiez les dépendances
- Vérifiez les chemins de fichiers

### **CORS Errors :**
- Vérifiez `CLIENT_URL` dans le backend
- Vérifiez `VITE_API_URL` dans le frontend

### **Database Connection :**
- Vérifiez `DATABASE_URL`
- Vérifiez les permissions MongoDB

## ✅ Checklist de Déploiement

- [ ] Code committé et pushé
- [ ] Variables d'environnement configurées
- [ ] Base de données configurée
- [ ] Services externes configurés
- [ ] CORS configuré
- [ ] Tests de déploiement réussis

Votre application sera maintenant déployée et accessible publiquement ! 🚀
