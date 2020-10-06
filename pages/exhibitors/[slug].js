
import {
    connect,
    MyLink as Link,
    WidgetVideoWithEventInfo,
    WidgetVisitor,
    WidgetCompany,
    WidgetAllExhibitorsColumnList,
    WidgetSalesMap,
    // WidgetPresenters,
    // WidgetSchedule,
    WidgetRoleButtons,
    configure,
    reduxWrapper,
    fetch,
    HeadCompany
  } from 'eventjuicer-site-components';
  
  import Head from 'next/head'

  import settings from '../../settings';

  const PageCompany = ({slug, dispatch}) => {
    
  return (
    <div>

     
      <HeadCompany slug={slug} ogTemplate="template_teh19_exhibitor_" defaultLang="pl">{(data) => <Head>{data}</Head>}</HeadCompany> 
 
      <WidgetCompany slug={slug} />
  
      <WidgetVideoWithEventInfo />

       <WidgetSalesMap
        label="exhibitors.map.title2"
        secondaryLabel="exhibitors.map.opensales"
      /> 
      
      <WidgetRoleButtons />
      
      <WidgetVisitor secondaryLabel="event.parties" />
  
      {/* <WidgetPresenters /> */}
  
      {/* <WidgetSchedule />*/}
  
      {/* <WidgetVisitor />  */}
  
     
  
      <WidgetAllExhibitorsColumnList />
    </div>
  );
  
  }
  
  PageCompany.defaultProps = {
    company: {}
  }
  

  export async function getStaticPaths() {
  
    // const request = await fetch(`${settings.system.api}/company-slugs`)
    // const slugs = await request.json();

    // if(!"data" in slugs){
    //   return
    // }

    // //precache only featured?
    // const filtered = slugs.data.filter(item => item.featured)

    return {
      // paths: filtered.map(row => ({ 
      //     params: {
      //       slug : row.slug
      //     }
      //   })),
      paths: [],
      fallback: true //do not throw 404 when not cached....
    };
     
  }

  
  export const getStaticProps = reduxWrapper.getStaticProps(async ({ store, params }) => {
  
    const {slug} = params;

    const resource = `companies/${slug}`;

    await configure(store, {
      settings : settings,
      preload : [resource, "exhibitors", "bookingmap", "allexhibitors"]
    })

    return {
        props : {
            slug :slug
        },
        revalidate : 1
    }
  
  })
  



  
  export default connect()(PageCompany);
  