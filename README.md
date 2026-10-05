# Song Performance
**Authors**: Amie Binan, Colin Hoar, Uma Mandapati, Sylvia Strayer

Producers listen to many song demos every day. To streamline their workload, this application will allow
both producers and new artists to predict their favorite artists’ future track performance based on past
analytics from Spotify.

Our project is to build a model that can take in parameters about a song to be put on spotify and predict
the number of streams based on those parameters. We are doing this by using a pruned version of the
Kaggle Spotify Artist Streaming dataset to make a gradient boosting regression model, though we hope to
refine how to build our final model.

## Getting Started

Follow these steps to install the dependencies and start the development environment.

### 1. Install Frontend Dependencies
From the **root directory** of the project, run the following command to install the node packages:
```bash
npm install
```

### 2. Sync Backend Dependencies
Navigate into the `backend` folder and synchronize your Python environment using `uv`:
```bash
cd backend
uv sync
```

### 3. Start the Development Server
Return to the **root directory** and launch the development servers:
```bash
cd ..
npm run dev
```
