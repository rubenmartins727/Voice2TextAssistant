# Voice to Text Assistant

## Introduction

Voice to Text Assistant is an innovative desktop application built using Electron, designed to enhance user interaction through a voice-to-text feature. This application focuses on capturing user voice input, converting it to text, and utilizing OpenAI's GPT models for intelligent responses. It is an excellent tool for hands-free communication and accessibility enhancement.

## Features

- **Voice Recognition**: Utilizes advanced voice recognition technology to accurately transcribe spoken words into text.
- **Integration with OpenAI's GPT**: Leverages GPT models for generating intelligent, contextually relevant responses.
- **Real-time Transcription Display**: Shows transcribed text in real time, enhancing the interactive experience.
- **Customizable User Interface**: Offers a clean and intuitive user interface with a visual assistant representation.
- **Multi-Language Support**: Capable of recognizing and transcribing multiple languages, including English and Portuguese.

## Technologies Used

- **Electron**: For cross-platform desktop application creation.
- **Node.js**: For backend functionality.
- **Google Cloud Speech-to-Text API**: For converting spoken words into text.
- **OpenAI API**: For processing transcribed text and generating responses.

## Requirements

- Node.js 12.x or higher
- Electron 11.x or higher
- A Google Cloud account with Speech-to-Text API enabled
- An OpenAI API key

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-github-username/voice-to-text-assistant.git
   cd voice-to-text-assistant

2. **Install Dependencies**:
    Install the necessary packages using npm:
    npm install

3. **Google Cloud API Setup**:
    Set up your Google Cloud account for the Speech-to-Text service:
    - Ensure you have a Google Cloud account with the Speech-to-Text API enabled.
    - Download your Google Cloud service account key and store it in a secure location.

4. **OpenAI API Setup**:
    Configure your OpenAI API access:
    - Obtain your OpenAI API key from your OpenAI account.

5. **Environment Configuration**:
    Set up your environment variables:
    - Set the path to your Google Cloud service account key in an environment variable.
    - Set your OpenAI API key in an environment variable.

6. **Starting the Application**:
    Launch the application with npm:
    npm start

## Contributing

Contributions to Voice to Text Assistant are welcome. Please follow the established coding standards and submit pull requests for any new features or bug fixes.

## License

This project is licensed under the MIT License.

