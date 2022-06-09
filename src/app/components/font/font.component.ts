import { Component, OnInit, Input } from '@angular/core';
import { FontIconSizes, FontIconTypes } from './types';


@Component({
  selector: 'app-font-icon',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.scss']
})
export class IconFontComponent implements OnInit {

  /** 
   * the name of the icon to load. This name will correspond to the name of an icon 
   * depending on the `iconType` selected. Icon types could be `flaticon`, `material icon`, `themify` or 
   * `font-awesome` icons 
   */
  @Input() iconName: string | null | undefined = null;

  /** the type of icon to use */
  @Input() iconType: FontIconTypes | null | undefined = 'flaticon';

  /** icon size to use  */
  @Input() iconSize: FontIconSizes = 'small';

  /** Icon colour */
  @Input() iconColor: string | null = '#000';


  /** 
   * 
   * the custom class provided for our `icon` 
   * */
  @Input() iconClass: any = null;

  /** custom styling to use for font icon */
  @Input() iconStyle: any = null;

  /** The  full name that correspond to the icon type to load */
  public iconClassName: string | null = null;


  /** full definition for the icon colour */
  public iconStyleString: string | null = null;

  /** The icons prefix mappers */
  private iconClassPrefixMapper = {
    flaticon: "flaticon-381",
    themify: "ti",
    material: "mdi mdi",
    remix: "ri",
    flag: "flag-icon flag-icon"
  }

  constructor() { }

  ngOnInit(): void {
    /**
     * construct the full icon class name based on the icon 
     */
    if(this.iconType)
      this.iconClassName = `${this.iconClassPrefixMapper[this.iconType]}-${this.iconName} ${this.iconSize}`

    /** 
     * icon style full definition. We can only use either `iconStyle` or `iconColor`  
     * If `iconStyle` is provided, `iconColor` will not be used
     * */
    if (this.iconClass) {
      this.iconClassName = `${this.iconClassName} ${this.iconClass}`;
    } 
    if (this.iconStyle) {
      this.iconStyleString = `color: ${this.iconColor}; ${this.iconStyle}`;
    } else {
      this.iconStyleString = `color: ${this.iconColor};`;
    }
  }
}