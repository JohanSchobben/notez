import { InjectionToken } from "@angular/core";
import { WidgetComponent } from "./widgetComponent";

export const WIDGET_ACCESSOR = new InjectionToken<WidgetComponent>('WidgetComponent');
