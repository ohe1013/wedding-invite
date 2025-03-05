/**
 * Kakao JavaScript SDK TypeScript Definitions
 *
 * Reference: https://developers.kakao.com/sdk/reference/js/release/Kakao.html
 * Document: https://developers.kakao.com/docs/latest/ko/getting-started/app
 */

export interface Kakao {
  VERSION: string;

  cleanup(): void;
  init(appKey: string): void;
  isInitialized(): boolean;

  API: {
    request(settings: {
      url: string;
      data?: Record<string, any>;
      files?: FileList | File[] | Blob[];
      success?: (response: any) => void;
      fail?: (error: { code: number; msg: string }) => void;
      always?: (param: any) => void;
    }): Promise<any>;
  };

  Auth: {
    authorize(settings: {
      redirectUri?: string;
      state?: string;
      scope?: string;
      throughTalk?: boolean;
      prompts?: string;
    }): void;

    login(settings: {
      success?: (authObj: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        scope: string;
      }) => void;
      fail?: (errorObj: { error: string; error_description: string }) => void;
      always?: (param: any) => void;
      scope?: string;
      persistAccessToken?: boolean;
      throughTalk?: boolean;
    }): void;

    logout(callback: () => void): void;

    getAccessToken(): string;
  };

  Channel: {
    addChannel(settings: { channelPublicId: string }): void;
    chat(settings: { channelPublicId: string }): void;
  };

  Link: {
    sendDefault(settings: {
      objectType: 'feed' | 'location' | 'commerce' | 'text' | 'list';
      content: {
        title: string;
        imageUrl: string;
        link: { webUrl?: string; mobileWebUrl?: string };
        description?: string;
      };
      address?: string;
      addressTitle?: string;
      buttons?: { title: string; link: { webUrl?: string; mobileWebUrl?: string } }[];
    }): void;
  };

  Navi: {
    share(settings: { name: string; x: number; y: number; coordType?: 'wgs84' | 'katec' }): void;
  };

  Story: {
    createShareButton(settings: {
      container: string | HTMLElement;
      url?: string;
      text?: string;
    }): void;
  };
}

// Kakao SDK를 `window.Kakao`에서 가져와 사용 가능하도록 전역 타입 정의
declare global {
  interface Window {
    Kakao: Kakao;
  }
}

export default window.Kakao;
