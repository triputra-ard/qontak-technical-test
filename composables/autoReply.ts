export const AUTO_REPLIES = {
  greetings: {
    patterns: [
      "hello",
      "hi",
      "hey",
      "halo",
      "hai",
      "pagi",
      "siang",
      "sore",
      "malam",
    ],
    responses: [
      "Terima kasih telah menghubungi kami. Ada yang bisa kami bantu?",
      "Selamat datang! Bagaimana kami bisa membantu Anda hari ini?",
      "Hai! Terima kasih sudah menghubungi kami. Silakan sampaikan pertanyaan Anda.",
    ],
  },
  farewell: {
    patterns: [
      "bye",
      "goodbye",
      "selamat tinggal",
      "sampai jumpa",
      "dadah",
      "tidak ada, terima kasih",
    ],
    responses: [
      "Terima kasih telah menghubungi kami. Semoga harimu menyenangkan!",
      "Sampai jumpa kembali! Jangan ragu untuk menghubungi kami lagi.",
    ],
  },
  thanks: {
    patterns: ["thanks", "thank you", "terima kasih", "makasih", "tengkyu"],
    responses: [
      "Sama-sama! Ada yang bisa kami bantu lagi?",
      "Dengan senang hati! Ada hal lain yang ingin ditanyakan?",
    ],
  },
  help: {
    patterns: ["help", "bantuan", "tolong", "bantu"],
    responses: [
      "Saya siap membantu Anda. Silakan jelaskan masalah yang Anda hadapi.",
      "Tentu, saya akan membantu. Apa yang bisa saya bantu?",
    ],
  },
  adminRequest: {
    patterns: [
      "talk to admin",
      "speak to admin",
      "hubungkan ke admin",
      "bicara dengan admin",
      "ke admin",
    ],
    responses: [
      "Baik, saya akan menghubungkan Anda dengan admin kami. Mohon tunggu sebentar...",
      "Permintaan Anda sedang diproses. Admin kami akan segera menghubungi Anda.",
    ],
  },
};

export const SYSTEM_USER = {
  id: "system",
  username: "System Assistant",
};

export class AutoReplyEngine {
  private static normalizeText(text: string): string {
    return text.toLowerCase().trim();
  }

  private static getRandomResponse(responses: string[]): string {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  private static isAdminRequest(message: string): boolean {
    const normalizedMessage = this.normalizeText(message);
    return AUTO_REPLIES.adminRequest.patterns.some((pattern) =>
      normalizedMessage.includes(this.normalizeText(pattern))
    );
  }

  static processMessage(message: string): {
    response: string | null;
    isAdminRequest: boolean;
  } {
    const normalizedMessage = this.normalizeText(message);
    let response = null;

    // Check for admin request first
    if (this.isAdminRequest(normalizedMessage)) {
      return {
        response: this.getRandomResponse(AUTO_REPLIES.adminRequest.responses),
        isAdminRequest: true,
      };
    }

    // Check other categories
    for (const [category, data] of Object.entries(AUTO_REPLIES)) {
      if (category === "adminRequest") continue; // Skip admin requests in general check

      if (
        data.patterns.some((pattern) =>
          normalizedMessage.includes(this.normalizeText(pattern))
        )
      ) {
        response = this.getRandomResponse(data.responses);
        break;
      }
    }

    return {
      response,
      isAdminRequest: false,
    };
  }
}
