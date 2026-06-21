declare module '@emailjs/browser' {
  interface EmailJSResponse {
    status: number;
    text: string;
  }

  interface EmailJSOptions {
    publicKey?: string;
    blockHeadless?: boolean;
    blockList?: {
      list?: string[];
      watchVariable?: string;
    };
    limitRate?: {
      id?: string;
      throttle?: number;
    };
  }

  interface EmailJS {
    init(publicKey: string): void;
    send(
      serviceId: string,
      templateId: string,
      templateParams?: Record<string, unknown>,
      options?: EmailJSOptions
    ): Promise<EmailJSResponse>;
  }

  const emailjs: EmailJS;
  export default emailjs;
}
