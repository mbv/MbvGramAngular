import {Subject} from "rxjs/Subject";
import {CompleterData, CompleterItem} from "ng2-completer";
import {SearchService} from "./search.service";


export class SearchCompleterData extends Subject<CompleterItem[]> implements CompleterData {
  constructor(private searchService: SearchService) {
    super();
  }

  public search(term: string): void {
    if (term) {
      this.searchService.search(term).subscribe((data: any) => {
        let matches: CompleterItem[] = data.map((result: any) => {
          return {
            title: SearchCompleterData.titleByType(result),
            description: SearchCompleterData.descriptionByType(result),
            image: SearchCompleterData.imageByType(result),
            originalObject: result,
          }
        });
        this.next(matches);
      });
    }
  }

  public static titleByType(o: any): string {
    switch (o.object_type) {
      case 'User': {
        return o.first_name + ' ' + o.last_name;
      }
      case 'Photo': {
        return 'Photo #' + o.id;
      }
      case 'Album': {
        return o.title;
      }
      default: {
        return 'Empty';
      }
    }
  }

  public static descriptionByType(o: any): string {
    switch (o.object_type) {
      case 'User': {
        return 'User';
      }
      case 'Photo': {
        return o.tag_list.join(', ');
      }
      case 'Album': {
        return o.tag_list.join(', ');
      }
      default: {
        return null;
      }
    }
  }

  public static imageByType(o: any): string {
    switch (o.object_type) {
      case 'User': {
        return (o.image) ? ('http://localhost:3000/' + o.image) : null;
      }
      case 'Photo': {
        return 'http://localhost:3000/' + o.file.small_thumb.url;
      }
      default: {
        return null;
      }
    }
  }

  public cancel() {
    // Handle cancel
  }
}
