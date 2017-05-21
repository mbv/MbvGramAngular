import {Subject} from "rxjs/Subject";
import {CompleterData, CompleterItem} from "ng2-completer";
import {SearchService} from "./search.service";
import {Router} from "@angular/router";


export class SearchCompleterData extends Subject<CompleterItem[]> implements CompleterData {
  constructor(private searchService: SearchService,
              private router: Router) {
    super();
  }

  public search(term: string): void {
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

  public goTo(selected: CompleterItem):void{
    if (!selected) {
      return;
    }
    let o = selected.originalObject;
    switch (o.object_type) {
      case 'User': {
        let link = ['/users', o.id];
        this.router.navigate(link);
        break;
      }

      case 'Album': {
        let link = ['/albums', o.id];
        this.router.navigate(link);
        break;
      }
      case 'Photo': {
        let link = ['/albums', o.album_id, 'photos', o.id];
        this.router.navigate(link);
        break;
      }
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
