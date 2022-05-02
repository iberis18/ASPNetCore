using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    public class Type
    {
        public Type()
        {
            Call = new HashSet<Call>();
            SMS = new HashSet<SMS>();
        }

        public int Id { get; set; }

        public string Name { get; set; }
        public virtual ICollection<Call> Call { get; set; }
        public virtual ICollection<SMS> SMS { get; set; }
    }
}
