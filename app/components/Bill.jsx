import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
export default function Bill(props){
    const price=props.price;
    return(
        <div className="flex flex-col my-1 justify-between">
                          
        <div className="flx">
           <div>
              <h1 className="cp">
                <ListAltIcon fontSize="small"/>
                 Items total</h1>
           </div>
           <div className="cp">&#x20b9;{price}</div>
        </div>

        <div className="flx">
          <div>
              <h1 className="cp">
                 <PedalBikeIcon fontSize="small"/>
                Delivery charge</h1>
          </div>
          <div className="cp">&#x20b9;15</div>
        </div>

        <div className="flx">
          <div>
              <h1 className="cp">
                <ShoppingBagIcon fontSize="small"/>
                Handling charge</h1>
          </div>
          <div className="cp">&#x20b9;10</div>
        </div>

        <div className="flx">
          <div>
              <h1 className="font-semibold font-sm">Grand total</h1>
          </div>
          <div className="font-semibold font-sm">&#x20b9;{price+5+10}</div>
        </div>


  </div>

    )
}