type AlertButtonOverlayHandler = boolean | void | { [key: string]: any };

export interface AlertButton {
    text: string;
    role?: 'cancel' | 'destructive' | string;
    cssClass?: string | string[];
    id?: string;
    htmlAttributes?: { [key: string]: any };
    handler?: (value: any) => AlertButtonOverlayHandler | Promise<AlertButtonOverlayHandler>;
  }